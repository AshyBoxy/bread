import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, LabelBuilder, MessageFlags, ModalBuilder, TextDisplayBuilder, TextInputBuilder, TextInputStyle, TopLevelComponent } from "discord.js";
import { ArgumentsBuilder, Command } from "../../framework";

const cmd = new Command((bot, ctx, args) => {
    if (ctx.isChatInteractionBased() && !args.getFlag("alwaysText")) {
        const modal = buildModal();
        ctx.interaction.showModal(modal);
        return;
    }

    // since modals can only be shown as a response to an interaction
    // send a button for text comands
    const actionRow = new ActionRowBuilder().setComponents(new ButtonBuilder()
        .setCustomId(cmd.makeComponentId("showModal1"))
        .setLabel("modal1")
        .setStyle(ButtonStyle.Danger)
    );

    ctx.send({ components: [actionRow.toJSON()] });
}, {
    name: "TestModal",
    runComponent: (bot, ctx, id) => {
        if (id === "showModal1") {
            const modal = buildModal();
            ctx.interaction.showModal(modal.toJSON());
        }
    },
    runModal: (bot, ctx, id) => {
        if (id === "modal1") {
            const data = ctx.interaction.fields.getTextInputValue("testInput");

            if (ctx.interaction.isFromMessage()) {
                const components = ctx.interaction.message.components;
                const newComponents: (TopLevelComponent | TextDisplayBuilder)[] = Array.from(components);
                let text = `${ctx.user} submitted modal1 with `;
                if (data.length > 0) text += `input: ${data}`;
                else text += "no input";
                if (components[0].type === ComponentType.TextDisplay) {
                    newComponents.shift();
                    text = `${components[0].content}\n${text}`;
                }
                newComponents.unshift(new TextDisplayBuilder().setContent(text));
                ctx.interaction.update({ components: newComponents, flags: MessageFlags.IsComponentsV2 });
            } else {
                let text = `${ctx.user} submitted modal1 with `;
                if (data.length > 0) text += `input: ${data}`;
                else text += "no input";
                ctx.reply(text);
            }
        }
    },
    args: new ArgumentsBuilder()
        .addFlag("alwaysText", "t", false)
});

export default cmd;

function buildModal(): ModalBuilder {
    const modal = new ModalBuilder()
        .setCustomId(cmd.makeComponentId("modal1"))
        .setTitle("Test Modal");

    const testInput = new TextInputBuilder()
        .setCustomId("testInput")
        .setPlaceholder("wowie")
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(30)
        .setRequired(false);
    const testInputLabel = new LabelBuilder()
        .setLabel("Test Input")
        .setDescription("waow")
        .setTextInputComponent(testInput);

    modal.addLabelComponents(testInputLabel);

    return modal;
}
