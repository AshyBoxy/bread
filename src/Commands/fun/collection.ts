import { formatEmoji } from "discord.js";
import { Breads } from "../../constants";
import { Command } from "../../framework";
import STRINGS from "../../strings";
import { mentions } from "../../Utils";

export default new Command(async (bot, msg, args) => {
    const user = await mentions.userFromMention(bot, args[0]) || msg.mentions?.repliedUser || msg.author || msg.user;
    const userData = await bot.dbs.userData.get(user.id);
    if (!userData?.breadCollection) return void (msg.reply(`${user.id === msg.author?.id || msg.user?.id ? "You" : "They"} have no bread`)); // shouldn't ever happen but you never know

    let message = `${STRINGS.UTILS.REACT.EMOJI.NON_SHINY}: ${userData.breadCollection.nonShiny || 0}\n`;
    message += `${formatEmoji(STRINGS.UTILS.REACT.EMOJI.SHINY)}: ${userData.breadCollection.shiny || 0}\n`;
    message += `${formatEmoji(STRINGS.UTILS.REACT.EMOJI.SQUARE_SHINY)}: ${userData.breadCollection.squareShiny || 0}\n`;
    message += `${formatEmoji(STRINGS.UTILS.REACT.EMOJI.GOLDEN)}: ${userData.breadCollection.golden || 0}`;
    for (const i of Object.keys(userData.breadCollection)) {
        if (i === "shiny" || i === "nonShiny" || i === "squareShiny" || i === "golden") continue;
        const b = Breads.find((x) => x.key === i);
        if (!b) continue;
        message += `\n${formatEmoji(b.data.emoji)}: ${userData.breadCollection[i]}`;
    }
    msg.send(message);
    // msg.channel.send(`\`\`\`json\n${JSON.stringify(userData, null, 4)}\`\`\``);
}, {
    name: "Collection",
    info: "Shows someone's bread collection",
    usage: "collection [@user]",
    aliases: ["c"],
    botPermission: [
        "SendMessages", "AttachFiles"
    ]
});
