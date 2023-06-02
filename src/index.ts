import * as path from "path";
import { Client } from "./framework";
import { BreadDB } from "./framework";
import modules from "./Commands/modules";
import config from "./config";
import STRINGS from "./strings";
import { react } from "./Utils";

const bot = new Client(
    config,
    modules,
    new BreadDB(path.join(config.dbBasePath, "guildConfigs.db")),
    new BreadDB(path.join(config.dbBasePath, "userData.db")),
    {
        messageCreate: {
            immediately: [(_bot, msg): number => (react(msg), 0)],
            beforeCommand: [(_bot, msg, cmd, _args, prefix): number => {
                if (cmd === "$hi" || cmd === "$hello" || cmd === `${prefix}hi` || cmd === `${prefix}hello`) {
                    msg.channel.send(STRINGS.EVENTS.MESSAGE.HELLO(msg.author.id));
                    return 1;
                }
                return 0;
            }]
        }
    }
);

await bot.setup();

bot.login(bot.config.token);

let siginted = false;
process.on("SIGINT", () => {
    if (siginted) return;
    siginted = true;
    bot.shutdown(STRINGS.MAIN.SIGINT);
});
let sigtermed = false;
process.on("SIGTERM", () => {
    if (sigtermed) return;
    sigtermed = true;
    bot.shutdown(STRINGS.MAIN.SIGTERM);
});
