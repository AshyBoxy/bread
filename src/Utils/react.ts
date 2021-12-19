import { Message } from "discord.js";
import STRINGS from "../strings";
import { randomInt } from "./randomNumber";

const react = (msg: Message): void => {
    if (
        !msg.content.toLowerCase().includes("bread") &&
        !msg.content.includes("🍞") &&
        !msg.content.toLowerCase().includes("bred")
    ) return;

    const shiny = roll(4096);
    const nonShiny = roll(3);
    const golden = roll(1);

    if (golden) {
        msgReact(msg, STRINGS.UTILS.REACT.EMOJI.GOLDEN);
        if (msg.author.id === msg.client.user?.id) return;
        msg.channel.send(STRINGS.UTILS.REACT.SPECIAL_MESSAGES.GOLDEN(msg.author.id));
    }
    else if (shiny) {
        const square = roll(16);
        if (square) {
            msgReact(msg, STRINGS.UTILS.REACT.EMOJI.SQUARE_SHINY);
            msg.channel.send(STRINGS.UTILS.REACT.SPECIAL_MESSAGES.SQUARE_SHINY(msg.author.id));
        }
        else {
            msgReact(msg, STRINGS.UTILS.REACT.EMOJI.SHINY);
            msg.channel.send(STRINGS.UTILS.REACT.SPECIAL_MESSAGES.SHINY(msg.author.id));
        }
    }
    else if (nonShiny) msgReact(msg, STRINGS.UTILS.REACT.EMOJI.NON_SHINY);
};

const roll = (odds: number, count?: number): boolean => {
    count = count || 1;
    for (let i = 0; i < count; i++) if (randomInt(1, odds) === 1) return true;
    return false;
};

const msgReact = (msg: Message, reaction: string): void => {
    msg.react(reaction).catch((error) => {
        if (typeof error.message !== "string") return;
        if (error.message === "Reaction blocked") msg.reply(STRINGS.UTILS.REACT.BLOCKED);
        else msg.reply(STRINGS.UTILS.REACT.ERROR(error));
    });
};

export default react;
