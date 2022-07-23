import { Command } from "../../framework";

export default new Command(async (bot, msg) => {
    const userData = await bot.getUserData(msg.author.id);
    msg.channel.send(`\`\`\`json\n${JSON.stringify(userData, null, 4)}\`\`\``);
}, {
    name: "Collection",
    info: "Shows someone's bread collection",
    usage: "collection [@user]",
    aliases: ["c"],
    botPermission: [
        "SendMessages", "AttachFiles"
    ]
});
