import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } from "discord.js";
import { Command } from "../../framework";
import { randomInt } from "../../Utils";

export default new Command(function (bot, ctx) {
    const num = randomInt(1, 1000).toString();

    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setCustomId(this.makeComponentId("test", [num]))
            .setLabel("Test")
            .setStyle(ButtonStyle.Primary)
        );

    ctx.send({ content: `test. the random number is ${num}`, components: [row] });
}, {
    name: "Test",
    info: "Test command",
    usage: "test ???",
    runComponent: (bot, ctx, id, data) => {
        if (id !== "test") {
            ctx.send("Unknown component id");
            bot.logger.warn(`Got unknown component id in test command: ${id}`);
            return;
        }
        ctx.send({ content: `${ctx.user.displayName} pressed the test button. the random number was ${data[0]}`, flags: MessageFlags.Ephemeral });
    }
});
