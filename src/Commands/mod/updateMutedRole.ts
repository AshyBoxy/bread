import GuildCommand from "../../Classes/GuildCommand";
import { COMMANDS, RETURN_CODES } from "../../constants";

export default new GuildCommand(async (bot, msg) => {
    let role = (await msg.guild.roles.fetch()).find((x) => x.name === COMMANDS.MOD.UPDATEMUTEDROLE.mutedRole);
    if (!role) role = await msg.guild.roles.create({
        ...COMMANDS.MOD.UPDATEMUTEDROLE.mutedData,
        reason: "No Muted Role"
    });
    if (!role || !msg.guild?.channels.cache) return RETURN_CODES.ERROR;

    for (const channel of msg.guild.channels.cache.values())
        if (channel.type === "GUILD_TEXT") channel.permissionOverwrites.create(
            role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        }, { reason: "Updating Muted Role" });
        else if (channel.type === "GUILD_VOICE") channel.permissionOverwrites.create(
            role, {
            SPEAK: false
        }, { reason: "Updating Muted Role" });
        else continue;

    return RETURN_CODES.OK;
}, {
    name: "UpdateMutedRole",
    permission: "ADMINISTRATOR"
});
