import { Snowflake } from "discord.js";
import { BreadClient } from "./src/framework/src";
import IDatabase from "./src/framework/src/Interfaces/Database";
import IUserData from "./src/Interfaces/UserData";

declare global {
    var bot: BreadClient;
}

declare module "./src/framework/src/Classes/Client" {
    interface BreadUserDBs {
        userData: IDatabase<IUserData>;
    }
}

declare module "./src/framework/src/Interfaces/Config" {
    interface UserConfig {
        subsPath?: string;
        slashCmdGuilds: Snowflake[];
    }
}

export { };
