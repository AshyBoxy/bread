import * as path from "path";
import { IConfig } from "./framework";

const config: IConfig = {
    prefix: "!",
    token: "definitely.areal.token",
    winston: {
        webhook: {
            id: "69",
            token: "420"
        }
    },
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ],
    eventsPath: path.join(__dirname, "Events"),
    commandsPath: path.join(__dirname, "Commands"),
    dbBasePath: `${path.join(__dirname, "..", "data")}`
};

export default config;
