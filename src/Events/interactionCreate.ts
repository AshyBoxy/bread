import EventHandler from "../Classes/EventHandler";
import { randomInt } from "../Utils/randomNumber";

export default new EventHandler("interactionCreate", () => (int): void => {
    if (int.isButton() || int.isCommand()) {
        const replies = [
            "aaaaa", "AHHHHHH", "ARGHHHHHH", "AAAAAAAAAAAA"
        ];
        int.reply(replies[randomInt(0, replies.length - 1)]);

    }
});
