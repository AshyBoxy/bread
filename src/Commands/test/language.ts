import { Command, newstrings } from "../../framework";

export default new Command(async (bot, msg, args) => {
    newstrings.clearSources().addSource((await import(`../../strings/${args[0]}.json`, { assert: { type: "json" } })).default).addSource((await import(`../../framework/dist/strings/${args[0]}.json`, { assert: { type: "json" } })).default);
}, {
    name: "Language",
    info: "Change Language",
    usage: "language <language>"
});
