import { BreadEmbed, Command, RETURN_CODES } from "../../framework";
import { ArgumentsBuilder } from "../../framework/src/Classes/Arguments";

const topCountryCount = 3;
const topConstituenciesCount = 3;

export default new Command(async (bot, ctx, args) => {
    const id = args.getString("petitionid");
    const population = await getPopulationData();
    const petition = await getPetitionData(id);
    if (!petition) {
        ctx.reply(`Could not get data for petition ${id}`);
        return RETURN_CODES.OK;
    }

    const petitionUrl = `https://petition.parliament.uk/petitions/${id}`;

    const embed = new BreadEmbed()
        .setTitle(petition.data.attributes.action)
        .setFooter(petitionUrl)
        .addField("Signatures", petition.data.attributes.signature_count.toString(), true);

    const topCountries =
        petition.data.attributes.signatures_by_country.sort((a, b) => b.signature_count - a.signature_count)
            .slice(0, topCountryCount + 1)
            .filter((a) => a.code !== "GB")
            .slice(0, topCountryCount); // it's unlikely that the gb will ever not be the top, but you never know
    embed.addField("Top non UK countries",
        topCountries.map((a) => `${a.name}:\t${a.signature_count}`).join("\n"), true);

    const topConstituencies =
        petition.data.attributes.signatures_by_constituency.sort(
            (a, b) => (b.signature_count / population[b.ons_code].population) - (a.signature_count / population[a.ons_code].population)
        ).slice(0, topConstituenciesCount);
    embed.addField("Top constituencies by % of population",
        topConstituencies.map((a) => `${a.name}:\t${(a.signature_count / population[a.ons_code].population * 100).toFixed(3)}% - ${a.signature_count}`).join("\n"), true);



    ctx.send({ embeds: [embed] });
    return RETURN_CODES.OK;
}, {
    args: new ArgumentsBuilder()
        .addGreedyString("petitionid", true)
});

type ISODateString = string;

interface FullPetitionData {
    links: {
        self: string;
    },
    data: PetitionData;
}

interface PetitionData {
    type: "petition";
    id: number;
    attributes: PetitionAttributes;
}

interface PetitionAttributes {
    action: string;
    background: string;
    additional_details: string;
    committee_note: string;
    state: "open" | string;
    signature_count: number;
    created_at: ISODateString | null;
    updated_at: ISODateString | null;
    rejected_at: ISODateString | null;
    opened_at: ISODateString | null;
    closed_at: ISODateString | null;
    moderation_threshold_reached_at: ISODateString | null;
    response_threshold_reached_at: ISODateString | null;
    government_response_at: ISODateString | null;
    debate_threshold_reached_at: ISODateString | null;
    scheduled_debate_date: ISODateString | null;
    debate_outcome_at: ISODateString | null;
    creator_name: string;
    rejection: string | null;
    government_response: string | null;
    debate: unknown | null;
    departments: PetitionDepartment[];
    topics: string[];
    signatures_by_country: PetitionCountrySignatures[];
    signatures_by_constituency: PetitionConstituencySignatures[];
    signatures_by_region: PetitionRegionSignatures[];
    other_parliamentary_business: unknown[];
}

interface PetitionDepartment {
    acronym: string;
    name: string;
    url: string;
}

interface PetitionCountrySignatures {
    name: string;
    code: string;
    signature_count: number;
}

interface PetitionConstituencySignatures {
    name: string;
    ons_code: string;
    mp: string;
    signature_count: number;
}

interface PetitionRegionSignatures {
    name: string;
    ons_code: string;
    signature_count: number;
}

async function getPetitionData(id: string): Promise<FullPetitionData | null> {
    const url = `https://petition.parliament.uk/petitions/${id}.json`;
    let data: FullPetitionData;
    try {
        data = await (await fetch(url)).json();
    } catch {
        return null;
    }

    // TODO: more checks?
    if (!data.data) return null;
    if (data.data.type !== "petition")
        return null;

    return data;
}

type PopulationData = Record<string, PopulationConstituencyData>;

interface PopulationConstituencyData {
    constituency: string;
    population: number;
}

// this data will not change often
let cachedPopulationData: PopulationData | null = null;
async function getPopulationData(): Promise<PopulationData> {
    if (cachedPopulationData) return cachedPopulationData;
    const url = "https://petitionmap.unboxedconsulting.com/json/mps/current/population_ons.json";
    let data: PopulationData;
    try {
        data = await (await fetch(url)).json();
    } catch {
        throw new Error("Could not get consituency population data");
    }
    if (!cachedPopulationData) cachedPopulationData = data;
    return data;
}
