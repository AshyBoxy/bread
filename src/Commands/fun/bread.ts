import { readFileSync } from "fs";
import path from "path";
import { globalEmbedColor } from "../../constants";
import { Command, BreadEmbed } from "../../framework";
import { randomInt } from "../../Utils";


export default new Command(async (bot, msg) => {
    const breads = readFileSync(path.join(bot.config.dbBasePath, "bred.txt")).toString().split(/\r?\n/g).map((x) => x.split("wiki/")[1]).filter((x) => !!x);

    const wikiResult = await (await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breads[randomInt(0, breads.length - 1)]}`)).json();

    const embed = new BreadEmbed()
        .setThumbnail(wikiResult.originalimage.source)
        .setTitle(wikiResult.title)
        .setDescription(wikiResult.extract)
        .setColor(globalEmbedColor);

    msg.channel.send({ embeds: [embed] });
}, {
    name: "bread",
    info: "bread",
    usage: "bread",
    aliases: []
});
