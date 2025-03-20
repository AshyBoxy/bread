import * as path from "node:path";
import modules from "./Commands/modules";
import config, { dbBasePath } from "./config";
import { Client, constants as fConstants, IGuildConfig, LevelDB, Strings } from "./framework";
import IUserData from "./Interfaces/UserData";
import STRINGS from "./strings";
import { react } from "./Utils";

const bot = new Client(
    config,
    {
        guildConfigs: new LevelDB<IGuildConfig>(path.join(dbBasePath, "guildConfigs.db")),
        userData: new LevelDB<IUserData>(path.join(dbBasePath, "userData.db"))
        // guildConfigs: new JsonDB<IGuildConfig>(path.join(dbBasePath, "guildConfigs.db.json")),
        // userData: new JsonDB<IUserData>(path.join(dbBasePath, "userData.db.json"))
    },
    modules,
    {
        messageCreate: {
            immediately: [(_bot, msg) => (react(msg), fConstants.HOOK_CODES.CONTINUE)],
            beforeCommand: [
                (_bot, msg, cmd, _args, prefix) => {
                    if (cmd === "$hi" || cmd === "$hello" || cmd === `${prefix}hi` || cmd === `${prefix}hello`) {
                        msg.channel.send(STRINGS.EVENTS.MESSAGE.HELLO(msg.author.id));
                        return fConstants.HOOK_CODES.STOP;
                    }
                    return fConstants.HOOK_CODES.CONTINUE;
                },
                (_bot, msg, cmd) => {
                    if (!_bot.config.development) return fConstants.HOOK_CODES.CONTINUE;
                    if (cmd === ";test") {
                        msg.reply("test beforeCommand hook");
                        return <fConstants.HOOK_CODES>69;
                        // return fConstants.HOOK_CODES.STOP;
                    }
                    return fConstants.HOOK_CODES.CONTINUE;
                }
            ],
            notCommand: [(_bot, msg, cmd) => {
                if (!_bot.config.development) return fConstants.HOOK_CODES.CONTINUE;
                if (cmd === ";test2") {
                    msg.reply("test notCommand hook");
                    return <fConstants.HOOK_CODES>69;
                }
                return fConstants.HOOK_CODES.CONTINUE;
            }]
        }
    }
);

global.bot = <Client>bot; // only exists for easier debugging(?) i forgor

const stringsPath = "./strings/english.json";
// const stringsPath = "./strings/french.json";
Strings.addDefaultSource({
    name: "bread_strings",
    data: (await import(stringsPath, { with: { type: "json" } })).default
}).clearSources();

await bot.setup();

const a = process.argv.slice(2).map((x) => x.toLowerCase());
if (a.includes("--cmdupdate")) {
    const user = await bot.getClientUser();
    bot.logger.info(`Updating slash commands for ${user.username}#${user.discriminator}`);

    const dev = a.includes("--cmddev");
    const clear = a.includes("--cmdclear");

    let guilds: string[] = [];
    if (dev) guilds = bot.config.slashCmdGuilds;

    if (clear) await bot.clearCommands(guilds);
    else await bot.publishCommands(guilds);

    await bot.shutdown("Only updating commands");
}
else bot.login(bot.config.token);

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
// let errored = true;
// process.on("uncaughtException", async (err, origin) => {
//     bot.logger.error(`${origin}: \`\`\`js\n${err}\`\`\``);
//     if (errored) return;
//     errored = true;
//     await bot.shutdown("Errored");
//     process.exit(1);
// });
