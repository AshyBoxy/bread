import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Command } from "../../framework";
// import { discord } from "../../Utils";

export default new Command((bot, ctx) => {
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setCustomId("test")
            .setLabel("Test")
            .setStyle(ButtonStyle.Primary)
        );

    ctx.send({ content: "test", components: [row] });

    // const avatar = bot.commands.get("avatar");
    // if (avatar) discord.runCommand(bot, msg, args, avatar);
    // const userinfo = bot.commands.get("userinfo");
    // if (userinfo) discord.runCommand(bot, msg, args, userinfo);
}, {
    name: "Test",
    info: "Test command",
    usage: "test ???"
});
