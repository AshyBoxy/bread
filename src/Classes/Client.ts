import { Client, ClientEvents, Collection } from "discord.js";
import { readdirSync } from "fs";
import * as path from "path";
import ICoins from "../Interfaces/Coins";
import IConfig from "../Interfaces/Config";
import IGuildConfig from "../Interfaces/GuildConfig";
import IModule from "../Interfaces/Module";
import STRINGS from "../strings";
import { logger } from "../Utils";
import Command from "./Command";
import EventHandler from "./EventHandler";
import LevelDB from "./LevelDB";
// import Web from "./Web";

class CustomClient extends Client {
    config: IConfig;
    modules: IModule[];
    commands: Collection<string, Command> = new Collection();
    aliases: Collection<string, string> = new Collection();

    guildConfigs: LevelDB<IGuildConfig>;
    coins: LevelDB<ICoins>;

    logger = logger;

    // web = new Web(this);

    constructor(
        config: IConfig, modules: IModule[], guildConfigs: LevelDB<IGuildConfig>, coins: LevelDB<ICoins>
    ) {
        super(config);
        this.config = config;
        this.modules = modules;
        this.guildConfigs = guildConfigs;
        this.coins = coins;

        const warnings: string[] = [];
        const infos: string[] = [];

        // load events
        const events: string[] = [];
        const eventFiles = readdirSync(this.config.eventsPath).filter((x: string) => x.endsWith(".js"));

        for (let i = 0; i < eventFiles.length; i++) {
            const event: EventHandler<keyof ClientEvents> = require(path.join(this.config.eventsPath, eventFiles[i]));
            this.on(event.name, event.execute(this));
            events.push(event.name);
        }
        infos.push(STRINGS.CLASSES.CLIENT.LOADED.EVENTS(events));

        // load commands
        const modulesLog: string[] = [];
        for (let i = 0; i < this.modules.length; i++) {
            const cmdFiles = readdirSync(path.join(this.config.commandsPath, this.modules[i].path)).filter((x: string) => x.endsWith(".js"));

            const commands: string[] = [];
            for (let x = 0; x < cmdFiles.length; x++) {
                const cmd: Command = require(path.join(this.config.commandsPath, this.modules[i].path, cmdFiles[x]));
                if (!cmd?.run || !cmd?.name) {
                    warnings.push(STRINGS.CLASSES.CLIENT.WARNING.COMMAND(cmdFiles[x].split(".js")[0], this.modules[i].name));
                    continue;
                }
                cmd.module = this.modules[i];
                this.commands.set(cmd.name.toLowerCase(), cmd);
                if (cmd.aliases) for (let y = 0; y < cmd.aliases.length; y++)
                    this.aliases.set(cmd.aliases[y], cmd.name.toLowerCase());
                commands.push(cmd.name);
            }
            modulesLog.push(`${this.modules[i].name} (${commands.join(", ")})`);
        }
        infos.push(STRINGS.CLASSES.CLIENT.LOADED.MODULES(modulesLog));

        // logs
        if (infos.length > 0) this.logger.info(infos.join("\n"));
        if (warnings.length > 0) this.logger.warn(warnings.join("\n"));
    }
}

export default CustomClient;
