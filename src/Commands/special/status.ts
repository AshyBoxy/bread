import * as os from "os";
import { Command, BreadEmbed, Strings } from "../../framework";
import STRINGS from "../../strings";
import * as discord from "discord.js";
import * as childProcess from "node:child_process";
import { promisify } from "node:util";
import path from "path";
const exec = promisify(childProcess.exec);

export default new Command(async (bot, msg) => {
    const embed = new BreadEmbed()
        .addField(Strings.getString("bread.commands.status.sysmem"),
            `${Math.round((os.totalmem() - os.freemem()) / 1024 / 1024)}/${Math.round(os.totalmem() / 1024 / 1024)}MB`, true)
        .addField(Strings.getString("bread.commands.status.botmem"),
            `${Math.round(process.memoryUsage.rss() / 1024 / 1024)}MB`, true)
        .addField(Strings.getString("bread.commands.status.sysuptime"), formatTime(os.uptime()), true);

    if (bot.uptime)
        embed.addField(Strings.getString("bread.commands.status.botuptime"), formatTime(bot.uptime / 1000), true);

    embed.addField(Strings.getString("bread.commands.status.djsver"), discord.version, true);

    embed.addField(Strings.getString("bread.commands.status.nodejsver"), process.version, true);

    const breadCommit = (await exec("git rev-parse HEAD")).stdout.slice(0, 10);
    const breadDirty =
        typeof (await exec("git diff-index --quiet HEAD --").catch(() => ({ stdout: false }))).stdout !== "string" ||
        typeof (await exec('test -z "$(git ls-files --others --exclude-standard)"').catch(() => ({ stdout: false }))).stdout !== "string";
    const frameworkCommit = (await exec("git rev-parse HEAD", { cwd: path.join(process.cwd(), "src/framework") })).stdout.slice(0, 10);
    const frameworkDirty =
        typeof (await exec("git diff-index --quiet HEAD --", { cwd: path.join(process.cwd(), "src/framework") }).catch(() => ({ stdout: false }))).stdout !== "string" ||
        typeof (await exec('test -z "$(git ls-files --others --exclude-standard)"', { cwd: path.join(process.cwd(), "src/framework") }).catch(() => ({ stdout: false }))).stdout !== "string";

    try {
        embed.addField(Strings.getString("bread.commands.status.breadver"), `${breadCommit}${breadDirty ? " [dirty]" : ""}`, true)
            .addField(Strings.getString("bread.commands.status.frameworkver"), `${frameworkCommit}${frameworkDirty ? " [dirty]" : ""}`, true);
    } catch (error) {
        bot.logger.error(Strings.getString("bread.commands.status.error", error));
    }

    msg.channel.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.SPECIAL.STATUS.DATA.NAME,
    info: STRINGS.COMMANDS.SPECIAL.STATUS.DATA.INFO,
    usage: STRINGS.COMMANDS.SPECIAL.STATUS.DATA.USAGE,
    botPermission: ["AttachFiles"]
});

function formatTime(secs: number): string {
    let time = "";
    const { days, hours, minutes, seconds } = secondsToMinutesHoursSeconds(secs);
    if (days > 0) time += `${days} day${days === 1 ? "" : "s"} `;
    if (hours > 0 || days > 0) time += `${hours} hour${hours === 1 ? "" : "s"} `;
    if (minutes > 0 || hours > 0 || days > 0) time += `${minutes} minute${minutes === 1 ? "" : "s"} `;
    if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) time += `${seconds} second${seconds === 1 ? "" : "s"} `;

    time = time.trim();

    return time;
}

function secondsToMinutesHoursSeconds(seconds: number): { days: number, hours: number, minutes: number, seconds: number; } {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return { days, hours: hours % 24, minutes: minutes % 60, seconds: Math.floor(seconds % 60) };
}
