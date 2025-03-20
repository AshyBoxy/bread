import { Collection, GuildMember, MessageMentionOptions, Snowflake } from "discord.js";
import { Command, Context, RETURN_CODES } from "../../framework";

const fetchedGuilds: Record<Snowflake, unknown> = {};
const currentlyFetchingGuilds: Record<Snowflake, Promise<Collection<string, GuildMember>>> = {};

const fetchMembers = async (ctx: Context): Promise<Collection<string, GuildMember>> => {
    if (!ctx.guild) throw new Error("Context.guild should not be null");
    const fetchedMembers = await ctx.guild.members.fetch({ time: 4000 });
    fetchedGuilds[ctx.guild.id] = true;
    delete currentlyFetchingGuilds[ctx.guild.id];
    return fetchedMembers;
};

export default new Command(async (bot, ctx) => {
    if (!ctx.guild) return RETURN_CODES.ERROR;
    let members: Collection<string, GuildMember>;

    let reply: (message: {
        content: string,
        allowedMentions: MessageMentionOptions;
    }) => Promise<unknown> = ctx.reply.bind(ctx);

    if (ctx.guild.id in fetchedGuilds) members = ctx.guild.members.cache;
    else {
        const replyMessage = ctx.isInteractionBased() ? ctx.interaction.deferReply() : ctx.reply("Fetching members");
        if (!(ctx.guild.id in currentlyFetchingGuilds)) {
            currentlyFetchingGuilds[ctx.guild.id] = fetchMembers(ctx);
            members = await currentlyFetchingGuilds[ctx.guild.id];
            delete currentlyFetchingGuilds[ctx.guild.id];
        } else members = await currentlyFetchingGuilds[ctx.guild.id];
        reply = (await replyMessage).edit.bind(await replyMessage);
    }

    const member = members.random();
    if (!member) return RETURN_CODES.ERROR;

    reply({ content: `Out of the ${members.size} members I can see, I pick ${member}`, allowedMentions: {} });
    return RETURN_CODES.OK;
}, {
    aliases: ["ru"],
    guildOnly: true,
    userCompatible: false
});
