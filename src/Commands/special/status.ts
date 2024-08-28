import * as os from "os";
import { Command, BreadEmbed, Strings } from "../../framework";
import STRINGS from "../../strings";
import * as discord from "discord.js";
import * as childProcess from "node:child_process";
import { promisify } from "node:util";
const exec = promisify(childProcess.exec);

async function getGitTag(dir: string): Promise<string | null> {
    try {
        const { stdout: tag } = await exec("git describe --tags --exact-match", { cwd: dir });
        return tag.trim();
    } catch (e) {
        return null;
    }
}
async function getGitCommit(dir: string): Promise<string | null> {
    try {
        const { stdout: commitHash } = await exec("git rev-parse HEAD", { cwd: dir });
        return commitHash.slice(0, 10);
    } catch (e) {
        return null;
    }
}
const getGitTagOrCommit = async (dir: string): Promise<string | null> => await getGitTag(dir) || await getGitCommit(dir);

async function getGitDirty(dir: string): Promise<boolean> {
    try {
        await exec("git diff-index --quiet HEAD --", { cwd: dir });
        await exec('test -z "$(git ls-files --others --exclude-standard)"', { cwd: dir });
        return false;
    } catch (error) {
        return true;
    }
}

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

    const breadCommit = await getGitTagOrCommit(".") || "unknown";
    const breadDirty = await getGitDirty(".");
    const frameworkCommit = await getGitTagOrCommit("./src/framework") || "unknown";
    const frameworkDirty = await getGitDirty("./src/framework");

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
