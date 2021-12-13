import EventHandler from "../Classes/EventHandler";

export default new EventHandler("interactionCreate", () => (int): void => {
    if (int.isButton() || int.isCommand())
        int.reply("aaaaaaaaaaa");
});
