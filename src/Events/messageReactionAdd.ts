import { Message } from "discord.js";
import { EventHandler } from "../framework";
import { discord } from "../Utils";

export default new EventHandler("messageReactionAdd", (bot) => async (reaction, user): Promise<void> => {
    if (reaction.emoji.name === "🅰️") {
        const avatar = bot.commands.get("avatar");
        if (!avatar) return;
        // const msg = Object.assign({}, await reaction.message.fetch(), { member: await reaction.message.guild?.members.fetch(await user.fetch()) });
        // const msg = (await reaction.message.fetch())._clone()
        const msg = Object.assign(Object.create(Message), await reaction.message.fetch(), { member: await reaction.message.guild?.members.fetch(await user.fetch()) });
        discord.runCommand(bot, msg, [], avatar);
    }
});
