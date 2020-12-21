import { Client, Message } from "discord.js";
import { RETURN_CODES } from "../../constants";

exports.run = (bot: Client, msg: Message): number => {
    msg.channel.send(`Pong! ${Math.floor(bot.ws.ping)}ms`);
    return RETURN_CODES.OK;
};

exports.name = "Ping";
exports.info = "Displays websocket ping";
exports.usage = "ping";
exports.aliases = [
    "p",
    "pong"
];

exports.disabled = false;
exports.guildOnly = false;
exports.dmOnly = false;
exports.permission = [];
