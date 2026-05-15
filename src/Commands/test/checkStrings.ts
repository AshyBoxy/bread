import { Command, Utils } from "../../framework";

export default new Command((bot, ctx) => {
    let log = "";

    for (const cmd of bot.commands.values()) {
        let cmdLog = "";

        if (cmd.getName() === cmd.getFullId())
            cmdLog += " [no name]";
        else if (cmd.name === cmd.getName())
            cmdLog += " [manual name]";

        if (cmd.info === cmd.getInfo())
            cmdLog += " [unlocalized info]";
        if (cmd.usage === cmd.getUsage())
            cmdLog += " [unlocalized usage]";

        for (const arg of cmd.args) {
            const descId = `${arg.id}.desc`;
            if (arg.id === Command.getArgumentName(arg))
                cmdLog += ` [${arg.id}: no name]`;
            else if (Command.getDiscordArgumentName(arg).startsWith("_toolong_"))
                cmdLog += ` [${arg.id}: name too long]`;
            if (descId === Command.getArgumentDescription(arg))
                cmdLog += ` [${arg.id}: no desc]`;
        }

        if (cmdLog.length > 0) log += `Command: ${cmd.getFullId()}:${cmdLog}\n`;
    }

    Utils.discord.sendSplit(ctx, log);
}, {
    messageOnly: true
});
