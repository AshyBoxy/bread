import { ChannelType, GuildMember, PermissionResolvable } from "discord.js";
import { RETURN_CODES } from "../constants";
import { Client, Command, Message } from "../framework";
import STRINGS from "../strings";

async function runCommand(bot: Client, msg: Message, args: string[], command: Command): Promise<unknown> {
    if (command.disabled)
        return msg.channel.send(STRINGS.UTILS.DISCORD.DISABLED);
    if (command.guildOnly && !msg.guild)
        return msg.channel.send(STRINGS.UTILS.DISCORD.GUILD_ONLY);
    if (command.dmOnly && msg.channel.type !== ChannelType.DM)
        return msg.channel.send(STRINGS.UTILS.DISCORD.DM_ONLY);
    if (command.permission && msg.channel.type !== ChannelType.DM)
        if (!checkPermission(command.permission, <GuildMember>msg.member))
            return msg.channel.send(STRINGS.UTILS.DISCORD.BAD_PERMISSIONS);
        else if (!checkPermission(command.botPermission, <GuildMember>msg.guild?.members.me))
            return msg.channel.send(STRINGS.UTILS.DISCORD.BOT_PERMISSIONS);

    const cmdRun = await (<Promise<number | void>>command.run(bot, msg, args))?.catch?.((err) => {
        bot.logger.error(`Error running ${command.name}: ${err || "empty error"}`);
        return RETURN_CODES.ERROR;
    });

    switch (cmdRun) {
        case RETURN_CODES.BAD_USAGE:
            return msg.channel.send(STRINGS.UTILS.DISCORD.BAD_USAGE(bot.config.prefix, command.usage));
        case RETURN_CODES.ERROR:
            return msg.channel.send(STRINGS.UTILS.DISCORD.ERROR);
        default:
            return;
    }
}

function checkPermission(permission: PermissionResolvable, member: GuildMember): boolean {
    if (!permission || !member) return false;

    const hasPerm = member.permissions.has(permission);

    return hasPerm;
}

export { runCommand, checkPermission };
