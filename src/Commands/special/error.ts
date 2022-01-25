import { GuildCommand } from "../../framework";

export default new GuildCommand(async () => {
    const errorFunc = (): Promise<unknown> => new Promise((res, rej) => { rej("test"); });
    const result = await errorFunc();
    if (result) return 1;
    return 0;
}, {
    name: "Error",
    info: "Throws an error",
    usage: "error"
});
