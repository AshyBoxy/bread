import { escapeMarkdown } from "discord.js";
import { readFileSync } from "fs";
import path from "path";
import { dbBasePath } from "../../config";
import { Command } from "../../framework";
import { randomInt } from "../../Utils";

// TODO: fix the formatting of bee.txt

const characterRegex = /^(=+)?[A-Z ]+(#[0-9])?[:=]+$/;

export default new Command((bot, ctx) => {
    const script = readFileSync(path.join(dbBasePath, "bee.txt"), "utf8");
    const lines = script.split("\n");
    let line = "";
    while (line.length < 1 || line === "=====" || line === ":" || characterRegex.test(line))
        line = lines[randomInt(0, lines.length - 1)].trim();

    ctx.send(escapeMarkdown(line));
}, {
    name: "bee",
    info: "bee",
    usage: "bee",
    aliases: []
});
