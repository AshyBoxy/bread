import { EventHandler } from "../framework";
import { randomInt } from "../Utils/randomNumber";

export default new EventHandler("interactionCreate", () => (int): void => {
    // temporary so not in STRINGS
    if (int.isButton() || int.isCommand()) {
        const replies = [
            "aaaaa", "AHHHHHH", "ARGHHHHHH", "AAAAAAAAAAAA"
        ];
        int.reply(replies[randomInt(0, replies.length - 1)]);
    }
});
