import { Command, newstrings } from "../../framework";

export default new Command((bot, msg, args) => {

    const strings: string[] = [];
    for (const arg of args) strings.push(newstrings.getString(arg));
    msg.channel.send(strings.map((x, i) => `${i}: \`${x}\``).join("\n"));

}, {
    name: "GetString",
    info: "Gets strings",
    usage: "getstring string.path"
});
