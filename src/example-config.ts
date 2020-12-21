import * as path from "path";
import IConfig from "./Interfaces/Config";

const config: IConfig = {
    "prefix": "!",
    "token": "definitely.areal.token",
    "winston": {
        "webhook": {
            "id": "69",
            "token": "420"
        }
    },
    "eventsPath": path.join(__dirname, "Events"),
    "commandsPath": path.join(__dirname, "Commands")
};

export default config;
