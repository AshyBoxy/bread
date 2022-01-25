import { EventHandler } from "../framework";
import STRINGS from "../strings";

export default new EventHandler("ready", (bot) => (): void => {
    bot.logger.info(STRINGS.EVENTS.READY.ONLINE(bot.user?.tag || ""));
});
