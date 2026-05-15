import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, FileUploadBuilder, LabelBuilder, MessageFlags, ModalBuilder, TextDisplayBuilder, TextInputBuilder, TextInputStyle, TopLevelComponent } from "discord.js";
import path from "node:path";
import fs from "node:fs/promises"
import { dbBasePath } from "../../config";
import { ArgumentsBuilder, Command, ModalMessageSubmitBasedContext } from "../../framework";

const cmd = new Command((bot, ctx, args) => {
    if (ctx.isChatInteractionBased() && !args.getFlag("alwaysText")) {
        const modal = buildModal1();
        ctx.interaction.showModal(modal);
        return;
    }

    const modal1 = new ButtonBuilder()
        .setCustomId(cmd.makeComponentId("showModal1"))
        .setLabel("modal1 (text)")
        .setStyle(ButtonStyle.Success);
    const modal2 = new ButtonBuilder()
        .setCustomId(cmd.makeComponentId("showModal2"))
        .setLabel("modal2 (files)")
        .setStyle(ButtonStyle.Success);
    const actionRow = new ActionRowBuilder().addComponents(modal1, modal2);

    ctx.send({ components: [actionRow.toJSON()] });
}, {
    name: "TestModal",
    runComponent: (bot, ctx, id) => {
        if (id === "showModal1") {
            const modal = buildModal1();
            ctx.interaction.showModal(modal.toJSON());
        } else if (id === "showModal2") {
            const modal = buildModal2();
            ctx.interaction.showModal(modal.toJSON());
        }
    },
    runModal: async (bot, ctx, id) => {
        if (id === "modal1") {
            const data = ctx.interaction.fields.getTextInputValue("testInput");

            if (ctx.isModalMessageSubmitBased()) {
                let text = `${ctx.user} submitted modal1 with `;
                if (data.length > 0) text += `input: ${data}`;
                else text += "no input";
                ctx.interaction.update({ components: addTextToMessage(ctx, text), flags: MessageFlags.IsComponentsV2 });
            } else {
                let text = `${ctx.user} submitted modal1 with `;
                if (data.length > 0) text += `input: ${data}`;
                else text += "no input";
                ctx.reply(text);
            }
        } else if (id === "modal2" && ctx.isModalMessageSubmitBased()) { // should always be from a message
            const outDir = path.join(dbBasePath, "uploads", "testModal");
            const goodTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

            const files = ctx.interaction.fields.getUploadedFiles("fileUpload", false);

            if (!files || files.size < 1) {
                ctx.interaction.update({ components: addTextToMessage(ctx, `${ctx.user} submitted modal2 with no files`), flags: MessageFlags.IsComponentsV2 });
                return;
            }

            let text = `${ctx.user} submitted modal2 with files: `;
            const fileArr = Array.from(files.values());
            const badFiles: number[] = fileArr.map((f, i) => goodTypes.includes(f.contentType ?? "") ? -1 : i).filter((i) => i !== -1); // thanks chatgpt
            text += files.map((f) => `[${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB) [${f.contentType ?? "unknown"}]](<${f.url}>)`).join(", ");
            if (badFiles.length > 0) text += `. files ${badFiles.map((i) => i + 1).join(", ")} have bad content types`;
            ctx.interaction.update({ components: addTextToMessage(ctx, text), flags: MessageFlags.IsComponentsV2 });

            fs.mkdir(outDir, { recursive: true }).catch(() => { void 0; });
            for (const file of files.values()) {
                const res = await fetch(file.url);
                const buffer = Buffer.from(await res.arrayBuffer());
                fs.writeFile(path.join(outDir, `${Date.now()}_${file.name}`), buffer).catch(() => { void 0; });
            }
        }
    },
    args: new ArgumentsBuilder()
        .addFlag("alwaysText", "t", false)
});

export default cmd;

function addTextToMessage(ctx: ModalMessageSubmitBasedContext, text: string): (TopLevelComponent | TextDisplayBuilder)[] {
    const components = ctx.interaction.message.components;
    const newComponents: (TopLevelComponent | TextDisplayBuilder)[] = Array.from(components);
    if (components[0].type === ComponentType.TextDisplay) {
        newComponents.shift();
        text = `${components[0].content}\n${text}`;
    }
    newComponents.unshift(new TextDisplayBuilder().setContent(text));
    return newComponents;
}

function buildModal1(): ModalBuilder {
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

function buildModal2(): ModalBuilder {
    const modal = new ModalBuilder()
        .setCustomId(cmd.makeComponentId("modal2"))
        .setTitle("Test File Upload");

    const fileUpload = new FileUploadBuilder()
        .setCustomId("fileUpload")
        .setMinValues(1)
        .setMaxValues(10)
        .setRequired(false);
    const fileUploadLabel = new LabelBuilder()
        .setLabel("gimme a file")
        .setDescription("uwu")
        .setFileUploadComponent(fileUpload);

    modal.addLabelComponents(fileUploadLabel);

    return modal;
}
