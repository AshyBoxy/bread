import EventHandler from "../Classes/EventHandler";
import STRINGS from "../strings";

export = new EventHandler("ready", (bot) => (): void => {
    bot.logger.info(STRINGS.EVENTS.READY.ONLINE(bot.user?.tag || ""));
});
