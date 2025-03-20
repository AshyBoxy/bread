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

    ctx.send({ content: "test2", components: [row] });
}, {
    name: "Test2",
    info: "Test2 command",
    usage: "test2 ???"
});
