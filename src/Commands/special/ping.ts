import { Command } from "../../framework";

export default new Command((bot, msg) => {
    msg.channel.send(`Pong! ${Math.floor(bot.ws.ping)}ms`);
    return 0;
}, {
    name: "Ping",
    info: "Displays websocket ping",
    usage: "ping",
    aliases: [
        "p",
        "pong"
    ],

    disabled: false,
    guildOnly: false,
    dmOnly: false,
    permission: [],

    interactionOnly: false,
    messageOnly: false,

    args: {}
});
