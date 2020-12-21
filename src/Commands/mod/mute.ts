import GuildCommand from "../../Classes/GuildCommand";
import { COMMANDS, RETURN_CODES } from "../../constants";

export = new GuildCommand(async (bot, msg, args) => {
    const member = msg.mentions.members?.first();
    const num = parseInt(args[1]) || COMMANDS.MOD.MUTE.defaultLength;
    const reason = args.slice(2) === [] ? null : args.slice(2).join(" ");

    if (!msg.mentions.members?.first() || !num || !member) return RETURN_CODES.BAD_USAGE;
    if (member.user.bot) return msg.channel.send(`${member} is a bot`), RETURN_CODES.OK;
    const time = num * COMMANDS.MOD.MUTE.lengthMultiplier;

    const role = msg.guild.roles.cache.find((x) => x.name === COMMANDS.MOD.MUTE.mutedRole);
    if (!role) return msg.channel.send("Could not find a Muted role!"), RETURN_CODES.OK;

    try {
        await member.roles.add(role, reason || undefined);
    } catch { return RETURN_CODES.ERROR; }

    msg.channel.send(`Muted ${member} for ${num} minute${num === 1 ? "" : "s"}`);

    setTimeout(() => {
        member.roles.remove(role).catch(() => null);
    }, time);

    return RETURN_CODES.OK;
}, {
    "name": "Mute",
    "info": "Mutes the specified user",
    "usage": "mute <@user> [time in minutes] [reason]",
    "permission": ["MANAGE_ROLES"],
    "botPermission": ["MANAGE_ROLES"]
});
