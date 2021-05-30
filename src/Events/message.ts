import EventHandler from "../Classes/EventHandler";
import IGuildConfig from "../Interfaces/GuildConfig";
import STRINGS from "../strings";
import * as utils from "../Utils";

export = new EventHandler("message", (bot) => async (msg): Promise<void> => {
    utils.react(msg);
    if (msg.author.bot) return;

    let guildConfig: IGuildConfig | undefined;
    if (msg.guild) {
        guildConfig = await bot.guildConfigs.get(msg.guild.id);
        if (!guildConfig) {
            guildConfig = {
                prefix: bot.config.prefix,
                disabledCommands: [],
                reactionRoles: []
            };
            bot.guildConfigs.set(msg.guild.id, guildConfig);
        }
    }

    const msgArr = msg.content.split(" ");
    let cmd = msgArr[0].toLowerCase();
    let args = msgArr.slice(1);

    let prefix = guildConfig?.prefix || bot.config.prefix;

    if (!cmd) return;

    if (new RegExp(`^<@!?${bot.user?.id}>$`).test(cmd)) {
        if (!msgArr[1]) return msg.channel.send(STRINGS.EVENTS.MESSAGE.PREFIX(prefix)), undefined;
        cmd = msgArr[1].toLowerCase();
        args = msgArr.slice(2);
        prefix = "";
    }

    if (cmd === "$hi" || cmd === "$hello" || cmd === `${prefix}hi` || cmd === `${prefix}hello`) {
        msg.channel.send(STRINGS.EVENTS.MESSAGE.HELLO(msg.author.id));
        return;
    }

    if (!cmd.startsWith(prefix)) return;

    let command;

    if (bot.commands.get(cmd.slice(prefix.length))) command = bot.commands.get(cmd.slice(prefix.length));
    else if (bot.commands.get(<string>bot.aliases.get(cmd.slice(prefix.length)))) command = bot.commands.get(<string>bot.aliases.get(cmd.slice(prefix.length)));

    if (command) utils.discord.runCommand(bot, msg, args, command);
});
