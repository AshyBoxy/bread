import { Command, strings } from "../../framework";
import { TranslationData } from "../../framework/src/strings";

export default new Command(async (bot, msg, args) => {
    const language = args[0]

    const bread: TranslationData = {
        name: `bread_${language}`,
        data: (await import(`../../strings/${args[0]}.json`, { with: { type: "json" } })).default
    }

    const breadfw: TranslationData = {
        name: `breadfw_${language}`,
        data: (await import(`../../framework/src/strings/${args[0]}.json`, { with: { type: "json" } })).default
    }

    strings.clearSources().addSource(bread).addSource(breadfw);
}, {
    name: "Language",
    info: "Change Language",
    usage: "language <language>"
});
