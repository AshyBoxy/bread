import { InteractionType } from "discord.js";
import { EventHandler } from "../framework";
import { randomInt } from "../Utils";

// TODO: make a general interaction handler for bread-framework

export default new EventHandler("interactionCreate", () => (int): void => {
    // temporary so not in STRINGS
    if (int.isButton() || int.type === InteractionType.ApplicationCommand) {
        const replies = [
            // "aaaaa", "AHHHHHH", "ARGHHHHHH", "AAAAAAAAAAAA"
            "ashy is cringe", "ashy is dumb"
        ];
        int.reply(replies[randomInt(0, replies.length - 1)]);
    }
});
