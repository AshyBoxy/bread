import { GatewayIntentBits, Partials } from "discord.js";
import * as path from "path";
import * as CONSTANTS from "./constants";
import { IConfig } from "./framework";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const config: IConfig = {
    prefix: "b!",
    token: "bot token",
    logging: {
        webhook: {
            id: "webhook id",
            token: "webhook token"
        }
    },
    eventsPath: path.join(__dirname, "Events"),
    commandsPath: path.join(__dirname, "Commands"),
    partials: [
        Partials.Reaction,
        Partials.Message
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent // priviledged
        // GatewayIntentBits.GuildMembers, // priviledged
        // GatewayIntentBits.GuildPresences // priviledged
    ],
    presence: CONSTANTS.PRESENCE,
    allowedMentions: {
        parse: ["users"],
        repliedUser: true
    },
    development: false
};

export const dbBasePath = `${path.join(__dirname, "..", "data")}`;

export default config;
