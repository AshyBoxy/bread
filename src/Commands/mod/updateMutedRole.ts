import { GuildCommand } from "../../framework";
import { COMMANDS, RETURN_CODES } from "../../constants";
import { ChannelType } from "discord.js";

export default new GuildCommand(async (bot, msg) => {
    let role = (await msg.guild.roles.fetch()).find((x) => x.name === COMMANDS.MOD.UPDATEMUTEDROLE.mutedRole);
    if (!role) role = await msg.guild.roles.create({
        ...COMMANDS.MOD.UPDATEMUTEDROLE.mutedData,
        reason: "No Muted Role"
    });
    if (!role || !msg.guild?.channels.cache) return RETURN_CODES.ERROR;

    for (const channel of msg.guild.channels.cache.values())
        if (channel.type === ChannelType.GuildText) channel.permissionOverwrites.create(
            role,
            {
                SendMessages: false,
                AddReactions: false
            }, { reason: "Updating Muted Role" });
        else if (channel.type === ChannelType.GuildVoice) channel.permissionOverwrites.create(
            role,
            {
                Speak: false
            }, { reason: "Updating Muted Role" });
        else continue;

    return RETURN_CODES.OK;
}, {
    name: "UpdateMutedRole",
    permission: "Administrator"
});
