import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Command } from "../../framework";
// import { discord } from "../../Utils";

export default new Command((bot, msg) => {
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setCustomId("test")
            .setLabel("Test")
            .setStyle(ButtonStyle.Primary)
        );

    msg.channel.send({ content: "test2", components: [row] });

    // const avatar = bot.commands.get("avatar");
    // if (avatar) discord.runCommand(bot, msg, args, avatar);
    // const userinfo = bot.commands.get("userinfo");
    // if (userinfo) discord.runCommand(bot, msg, args, userinfo);
}, {
    name: "Test2",
    info: "Test2 command",
    usage: "test2 ???"
});
