import { Message } from "../framework";
import STRINGS from "../strings";
import { randomInt } from ".";
import { EmojiIdentifierResolvable } from "discord.js";
import { Breads } from "../constants";
import IUserData from "../Interfaces/UserData";
import IDatabase from "../framework/src/Interfaces/Database";

const react = async (msg: Message): Promise<void> => {
    // const userData = await msg.client.getUserData(msg.author.id);
    const userData: IUserData & { breadCollection: Record<string, number | undefined>; } = <never>await (<IDatabase<IUserData>>msg.client.dbs.userData).get(msg.author.id) || {};
    userData.breadCollection ??= {}; // funny operator

    if (
        msg.content.toLowerCase().includes("bread") ||
        msg.content.includes("🍞") ||
        msg.content.toLowerCase().includes("bred")
    ) {
        const shiny = roll(4096);
        const nonShiny = roll(3);
        const golden = roll(8192);

        // const nonShiny = randomInt(1, 3);
        // switch (nonShiny) {
        //     case 1:
        //         msgReact(msg, "1️⃣");
        //         break;
        //     case 2:
        //         msgReact(msg, "2️⃣");
        //         break;
        //     case 3:
        //         msgReact(msg, "3️⃣");
        //         break;
        //     default:
        //         msgReact(msg, "❓");
        // }


        if (golden) {
            userData.breadCollection.golden = (userData.breadCollection.golden || 0) + 1;
            msgReact(msg, STRINGS.UTILS.REACT.EMOJI.GOLDEN);
            msg.channel.send(STRINGS.UTILS.REACT.SPECIAL_MESSAGES.GOLDEN(msg.author.id));
        } else if (shiny) {
            const square = roll(16);
            if (square) {
                userData.breadCollection.squareShiny = (userData.breadCollection.squareShiny || 0) + 1;
                msgReact(msg, STRINGS.UTILS.REACT.EMOJI.SQUARE_SHINY);
                msg.channel.send(STRINGS.UTILS.REACT.SPECIAL_MESSAGES.SQUARE_SHINY(msg.author.id));
            } else {
                userData.breadCollection.shiny = (userData.breadCollection.shiny || 0) + 1;
                msgReact(msg, STRINGS.UTILS.REACT.EMOJI.SHINY);
                msg.channel.send(STRINGS.UTILS.REACT.SPECIAL_MESSAGES.SHINY(msg.author.id));
            }
        } else if (nonShiny) {
            userData.breadCollection.nonShiny = (userData.breadCollection.nonShiny || 0) + 1;
            msgReact(msg, STRINGS.UTILS.REACT.EMOJI.NON_SHINY);
        }
    }

    Breads.forEach((b) => b.run(msg, userData));

    msg.client.dbs.userData.set(msg.author.id, userData);
};

const roll = (odds: number, count = 1): boolean => {
    for (let i = 0; i < count; i++) if (randomInt(1, odds) === 1) return true;
    return false;
};

const msgReact = (msg: Message, reaction: EmojiIdentifierResolvable): void => {
    msg.react(reaction).catch((error) => {
        if (typeof error.message !== "string") return;
        if (error.message === "Reaction blocked") msg.reply(STRINGS.UTILS.REACT.BLOCKED);
        else msg.reply(STRINGS.UTILS.REACT.ERROR(error));
    });
};

export default react;
export { roll, msgReact };
