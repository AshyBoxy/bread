import EventHandler from "../Classes/EventHandler";
import STRINGS from "../strings";

export = new EventHandler("ready", (bot) => (): void => {
    bot.logger.info(STRINGS.EVENTS.READY.ONLINE(bot.user?.tag || ""));
    bot.user?.setPresence({
        activity: {
            name: STRINGS.EVENTS.READY.ACTIVITY_NAME,
            type: "WATCHING"
        },
        status: "idle"
    });
});
