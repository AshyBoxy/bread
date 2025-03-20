import { Command, BreadEmbed } from "../../framework";
import STRINGS from "../../strings";
import { getRandomVerse, getVerse } from "../../Utils/bible";

export default new Command(async (bot, ctx) => {
    const embed = new BreadEmbed();
    const args: string[] = ctx.isMessageBased() ? ctx.message.content.split(" ").slice(1) : [];
    if (args[0] && args[1]) {
        const verse = await getVerse(args[0], parseInt(args[1]), args[2] || "1-5");

        embed.setTitle(`${args[0]} ${args[1]}:${args[2] || "1-5"}`)
            .setDescription(verse.verses.join("\n"))
            .setFooter(verse.copyright);
    } else {
        const verse = await getRandomVerse();

        embed.setTitle(`${verse.book.name} ${verse.chapter}:${verse.verseNumber}`)
            .setDescription(verse.verse.verses.join("\n"))
            .setFooter(verse.verse.copyright);
    }
    ctx.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.FUN.BIBLE.DATA.NAME,
    usage: STRINGS.COMMANDS.FUN.BIBLE.DATA.USAGE,
    info: STRINGS.COMMANDS.FUN.BIBLE.DATA.INFO
});
