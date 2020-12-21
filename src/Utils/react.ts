import { Message } from "discord.js";

const react = (msg: Message): void => {
    if (
        !msg.content.toLowerCase().includes("bread") &&
        !msg.content.includes("🍞") &&
        !msg.content.toLowerCase().includes("bred")
    ) return;

    const shiny = Math.floor(Math.random() * 4096) + 1;
    const nonShiny = Math.floor(Math.random() * 3) + 1;

    if (shiny === 1) {
        const square = Math.floor(Math.random() * 16) + 1;
        if (square === 1) msg.react("718797512449851502");
        else msg.react("718797512336474132");
    } else if (nonShiny === 1) msg.react("🍞");
};

export default react;
