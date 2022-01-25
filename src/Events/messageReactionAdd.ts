import EventHandler from "../Classes/EventHandler";
import { discord } from "../Utils";

export default new EventHandler("messageReactionAdd", (bot) => async (reaction): Promise<void> => {
    if (reaction.emoji.name === "🅰️") {
        const avatar = bot.commands.get("avatar");
        if (!avatar) return;
        const msg = await reaction.message.fetch();
        discord.runCommand(bot, msg, [], avatar);
    }
});
