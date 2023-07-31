import * as path from "path";
import { Client, Strings } from "./framework";
import { BreadDB } from "./framework";
import modules from "./Commands/modules";
import config from "./config";
import STRINGS from "./strings";
import { react } from "./Utils";
import { constants as fConstants } from "./framework";

const bot = new Client(
    config,
    modules,
    new BreadDB(path.join(config.dbBasePath, "guildConfigs.db")),
    new BreadDB(path.join(config.dbBasePath, "userData.db")),
    {
        messageCreate: {
            immediately: [(_bot, msg): number => (react(msg), fConstants.HOOK_CODES.CONTINUE)],
            beforeCommand: [(_bot, msg, cmd, _args, prefix): number => {
                if (cmd === "$hi" || cmd === "$hello" || cmd === `${prefix}hi` || cmd === `${prefix}hello`) {
                    msg.channel.send(STRINGS.EVENTS.MESSAGE.HELLO(msg.author.id));
                    return fConstants.HOOK_CODES.STOP;
                }
                return fConstants.HOOK_CODES.CONTINUE;
            }]
        }
    }
);

global.bot = bot;

Strings.addSource((await import("./strings/default.json", { assert: { type: "json" } })).default);

await bot.setup();

bot.login(bot.config.token);

let siginted = false;
process.on("SIGINT", () => {
    if (siginted) return;
    siginted = true;
    bot.shutdown(Strings.getString("bread.main.sigint"));
});
let sigtermed = false;
process.on("SIGTERM", () => {
    if (sigtermed) return;
    sigtermed = true;
    bot.shutdown(Strings.getString("bread.main.sigterm"));
});
