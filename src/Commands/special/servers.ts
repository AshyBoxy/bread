import { Command } from "../../framework";

export default new Command((bot, msg) => {
    msg.channel.send(bot.guilds.cache.map((x) => x.name).join("\n"));
    return 0;
}, {
    name: "Servers",
    info: "Displays servers the bot is in",
    usage: "servers"
});
