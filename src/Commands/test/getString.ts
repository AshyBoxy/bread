import { Command, strings } from "../../framework";

export default new Command((bot, msg, args) => {

    const s: string[] = [];
    for (const arg of args) s.push(strings.getString(arg));
    msg.channel.send(s.map((x, i) => `${i}: \`${x}\``).join("\n"));

}, {
    name: "GetString",
    info: "Gets strings",
    usage: "getstring string.path"
});
