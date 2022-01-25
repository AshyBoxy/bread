import IModule from "../Interfaces/Module";

const modules: IModule[] = [
    {
        name: "Special",
        path: "special",
        description: "Special Commands"
    },
    {
        name: "Fun",
        path: "fun",
        description: "Fun Commands"
    }, {
        name: "Moderation",
        path: "mod",
        description: "Moderation Commands"
    }, {
        name: "Configuration",
        path: "config",
        description: "Configuration Commands"
    }
];

export default modules;
