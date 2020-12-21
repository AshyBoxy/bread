/**
 * entry file
 * @packageDocumentation
 */

import * as path from "path";
import Client from "./Classes/Client";
import LevelDB from "./Classes/LevelDB";
import modules from "./Commands/modules";
import config from "./config";
import STRINGS from "./strings";

const dbBasePath = `${path.join(__dirname, "..", "data")}`;

const bot = new Client({
    "partials": [
        "REACTION",
        "MESSAGE"
    ],
    "ws": {
        "intents": [
            "GUILDS",
            "GUILD_MESSAGES",
            "GUILD_MESSAGE_REACTIONS"
            // "GUILD_MEMBERS", // priviledged
            // "GUILD_PRESENCES" // priviledged
        ]
    }
}, config, modules,
    new LevelDB(path.join(dbBasePath, "guildConfigs.db")),
    new LevelDB(path.join(dbBasePath, "coins.db"))
);

bot.login(bot.config.token);

// clean exit
const shutdown = async (reason: string): Promise<void> => {
    bot.logger.info(STRINGS.MAIN.SHUTTING_DOWN(reason));
    await Promise.all([
        bot.guildConfigs.db.close(), bot.coins.db.close()
    ]);
    bot.destroy();
    process.exit();
};
process.on("SIGINT", () => shutdown(STRINGS.MAIN.SIGINT));
process.on("SIGTERM", () => shutdown(STRINGS.MAIN.SIGTERM));
