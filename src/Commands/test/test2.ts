import { ButtonBuilder, ButtonStyle, ContainerBuilder, MessageFlags } from "discord.js";
import { Command } from "../../framework";

export default new Command(function (bot, ctx) {
    const container = new ContainerBuilder()
        .addTextDisplayComponents((c) => c.setContent("wowie"))
        .addSeparatorComponents((c) => c.setDivider(true))
        .addTextDisplayComponents((c) => c.setContent("weird"))

        .addActionRowComponents((c) => c.setComponents(
            new ButtonBuilder()
                .setCustomId(this.makeComponentId("one"))
                .setLabel("One")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(this.makeComponentId("two"))
                .setLabel("Two")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(this.makeComponentId("three"))
                .setLabel("Three")
                .setStyle(ButtonStyle.Danger)
        ));
    ctx.send({ components: [container], flags: MessageFlags.IsComponentsV2 });
}, {
    name: "Test2",
    info: "Test2 command",
    usage: "test2 ???",
    runComponent: (bot, ctx, id) => {
        ctx.send(`${ctx.user.displayName} pressed button ${id}`);
    }
});
