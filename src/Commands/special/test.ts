import { MessageActionRow, MessageButton } from "discord.js";
import Command from "../../Classes/Command";

export default new Command((bot, msg) => {
    const row = new MessageActionRow()
        .addComponents(new MessageButton()
            .setCustomId("test")
            .setLabel("Test")
            .setStyle("PRIMARY")
        );

    msg.channel.send({ content: "test", components: [row] });
}, {
    name: "Test",
    info: "Test command",
    usage: "test ???"
});
