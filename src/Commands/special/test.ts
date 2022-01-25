// import { MessageActionRow, MessageButton } from "discord.js";
import Command from "../../Classes/Command";
import { discord } from "../../Utils";

export default new Command((bot, msg, args) => {
    // const row = new MessageActionRow()
    //     .addComponents(new MessageButton()
    //         .setCustomId("test")
    //         .setLabel("Test")
    //         .setStyle("PRIMARY")
    //     );

    // msg.channel.send({ content: "test", components: [row] });

    const avatar = bot.commands.get("avatar");
    if (avatar) discord.runCommand(bot, msg, args, avatar);
    const userinfo = bot.commands.get("userinfo");
    if (userinfo) discord.runCommand(bot, msg, args, userinfo);
}, {
    name: "Test",
    info: "Test command",
    usage: "test ???"
});
