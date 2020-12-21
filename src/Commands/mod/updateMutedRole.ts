import Command from "../../Classes/Command";
import { COMMANDS, RETURN_CODES } from "../../constants";

export = new Command(async (bot, msg) => {
    let role = (await msg.guild?.roles?.fetch())?.cache.find((x) => x.name === COMMANDS.MOD.UPDATEMUTEDROLE.mutedRole);
    if (!role) role = await msg.guild?.roles.create({
        "data": COMMANDS.MOD.UPDATEMUTEDROLE.mutedData,
        "reason": "No Muted Role"
    });
    if (!role || !msg.guild?.channels.cache) return RETURN_CODES.ERROR;

    for (const channel of msg.guild.channels.cache.values())
        if (channel.type === "text") channel.createOverwrite(
            role, {
            "SEND_MESSAGES": false,
            "ADD_REACTIONS": false
        }, "Updating Muted Role");
        else if (channel.type === "voice") channel.createOverwrite(
            role, {
            "SPEAK": false
        }, "Updating Muted Role");
        else continue;

    return RETURN_CODES.OK;
}, {
    "name": "UpdateMutedRole",
    "permission": "ADMINISTRATOR",
    "guildOnly": true
});
