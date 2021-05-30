import * as path from "path";
import Client from "./Classes/Client";
import LevelDB from "./Classes/LevelDB";
import modules from "./Commands/modules";
import config from "./config";
import STRINGS from "./strings";

const dbBasePath = `${path.join(__dirname, "..", "data")}`;

const bot = new Client(
    config,
    modules,
    new LevelDB(path.join(dbBasePath, "guildConfigs.db")),
    new LevelDB(path.join(dbBasePath, "coins.db"))
);

bot.login(bot.config.token);

process.on("SIGINT", () => bot.shutdown(STRINGS.MAIN.SIGINT));
process.on("SIGTERM", () => bot.shutdown(STRINGS.MAIN.SIGTERM));
