import { Command, constants } from "../../framework";
import { COMMANDS } from "../../constants";
import STRINGS from "../../strings";
const { RETURN_CODES } = constants;

export default new Command(async (bot, msg, args) => {
    if (!msg.guild) return RETURN_CODES.ERROR;
    if (args.length < 1) return RETURN_CODES.BAD_USAGE;
    const guildConfig = await bot.dbs.guildConfigs.get(msg.guild.id);
    if (!guildConfig) return RETURN_CODES.ERROR;

    if (args[0].length > COMMANDS.CONFIG.PREFIX.maxLength)
        return msg.channel.send(STRINGS.COMMANDS.CONFIG.PREFIX.TOO_LONG(COMMANDS.CONFIG.PREFIX.maxLength))
            , RETURN_CODES.OK;
    guildConfig.prefix = args[0].toLowerCase();

    await bot.dbs.guildConfigs.set(msg.guild.id, guildConfig);

    msg.channel.send(`Set prefix to \`${guildConfig.prefix}\``);

    return RETURN_CODES.OK;
}, {
    name: STRINGS.COMMANDS.CONFIG.PREFIX.DATA.NAME,
    guildOnly: true,
    usage: STRINGS.COMMANDS.CONFIG.PREFIX.DATA.USAGE,
    info: STRINGS.COMMANDS.CONFIG.PREFIX.DATA.INFO,
    permission: ["ManageGuild"]
});
