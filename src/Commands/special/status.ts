import * as os from "os";
import MessageEmbed from "../../Classes/MessageEmbed";
import { Command } from "../../framework";
import STRINGS from "../../strings";

export default new Command((bot, msg) => {
    const embed = new MessageEmbed()
        .addField("System Memory Usage",
            `${Math.round((os.totalmem() - os.freemem()) / 1024 / 1024)}/${Math.round(os.totalmem() / 1024 / 1024)}MB`, true)
        .addField("Bot Used Memory",
            `${Math.round(process.memoryUsage.rss() / 1024 / 1024)}MB`, true)
        .addField("System Uptime", formatTime(os.uptime()), true);

    if (bot.uptime)
        embed.addField("Bot Uptime", formatTime(bot.uptime / 1000), true);

    msg.channel.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.SPECIAL.STATUS.DATA.NAME,
    info: STRINGS.COMMANDS.SPECIAL.STATUS.DATA.INFO,
    usage: STRINGS.COMMANDS.SPECIAL.STATUS.DATA.USAGE,
    botPermission: ["AttachFiles"]
});

function formatTime(secs: number): string {
    let time = "";
    const { hours, minutes, seconds } = secondsToMinutesHoursSeconds(secs);
    if (hours > 0) time += `${hours} hour${hours === 1 ? "" : "s"} `;
    if (minutes > 0 || hours > 0) time += `${minutes} minute${minutes === 1 ? "" : "s"} `;
    if (seconds > 0 || minutes > 0 || hours > 0) time += `${seconds} second${seconds === 1 ? "" : "s"} `;

    time = time.trim();

    return time;
}

function secondsToMinutesHoursSeconds(seconds: number): { hours: number, minutes: number, seconds: number; } {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return { hours, minutes: minutes % 60, seconds: Math.floor(seconds % 60) };
}
