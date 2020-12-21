import { ClientOptions } from "discord.js";

interface ClientConfig {
    prefix: string;
    token: string;
    winston: {
        webhook: {
            "id": string;
            "token": string;
        };
    };
    eventsPath: string;
    commandsPath: string;
}
type IConfig = ClientConfig & ClientOptions;

export default IConfig;
