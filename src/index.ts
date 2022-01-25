import * as path from "path";
import { Client } from "./framework";
import { LevelDB } from "./framework";
import modules from "./Commands/modules";
import config from "./config";
import STRINGS from "./strings";

const bot = new Client(
    config,
    modules,
    new LevelDB(path.join(config.dbBasePath, "guildConfigs.db")),
    new LevelDB(path.join(config.dbBasePath, "userData.db"))
);

await bot.setup();

bot.login(bot.config.token);

process.on("SIGINT", () => bot.shutdown(STRINGS.MAIN.SIGINT));
process.on("SIGTERM", () => bot.shutdown(STRINGS.MAIN.SIGTERM));
