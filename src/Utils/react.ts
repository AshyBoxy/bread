import { Message } from "discord.js";
import { randomInt } from "./randomNumber";

const react = (msg: Message): void => {
    if (
        !msg.content.toLowerCase().includes("bread") &&
        !msg.content.includes("🍞") &&
        !msg.content.toLowerCase().includes("bred")
    ) return;

    const shiny = roll(4096);
    const nonShiny = roll(3);
    const golden = roll(8192);

    if (golden) {
        msg.react("919761954980106260");
        msg.channel.send(`${msg.author} got golden bread!`);
    }
    else if (shiny) {
        const square = roll(16);
        if (square) {
            msg.react("718797512449851502");
            msg.channel.send(`${msg.author} got square shiny bread!`);
        }
        else {
            msg.react("718797512336474132");
            msg.channel.send(`${msg.author} got shiny bread!`);
        }
    }
    else if (nonShiny) msg.react("🍞");
};

const roll = (odds: number, count?: number): boolean => {
    count = count || 1;
    for (let i = 0; i < count; i++) if (randomInt(1, odds) === 1) return true;
    return false;
};

export default react;
