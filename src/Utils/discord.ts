import { Message, GuildMember, PermissionResolvable } from "discord.js";
import Client from "../Classes/Client";
import Command from "../Classes/Command";
import { RETURN_CODES } from "../constants";
import STRINGS from "../strings";

async function runCommand(bot: Client, msg: Message, args: string[], command: Command): Promise<unknown> {
    if (command.disabled) return msg.channel.send(STRINGS.UTILS.DISCORD.DISABLED);
    if (command.guildOnly && !msg.guild) return msg.channel.send(STRINGS.UTILS.DISCORD.GUILD_ONLY);
    if (command.dmOnly && msg.channel.type !== "dm") return msg.channel.send(STRINGS.UTILS.DISCORD.DM_ONLY);
    if (command.permission) if (msg.channel.type !== "dm") if (!checkPermission(command.permission, msg.member as GuildMember)) return msg.channel.send(STRINGS.UTILS.DISCORD.BAD_PERMISSIONS);

    const cmdRun = await command.run(bot, msg, args);

    if (cmdRun === RETURN_CODES.BAD_USAGE)
        return msg.channel.send(STRINGS.UTILS.DISCORD.BAD_USAGE(bot.config.prefix, command.usage));
    else if (cmdRun === RETURN_CODES.ERROR) return msg.channel.send(STRINGS.UTILS.DISCORD.ERROR);

    return;
}

function checkPermission(permission: PermissionResolvable, member: GuildMember): boolean {
    if (!permission || !member) return false;

    const hasPerm = member.hasPermission(permission);

    return hasPerm;
}

export { runCommand, checkPermission };
