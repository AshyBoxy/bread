import Command from "../../Classes/Command";
import { COMMANDS, RETURN_CODES } from "../../constants";
import { getCoins } from "../../defaults";

export default new Command(async (bot, msg) => {
    const user = msg.author;

    let coins = await bot.coins.get(user.id);
    if (!coins) coins = getCoins(user.id);

    if (coins.cooldowns.hourly > Date.now())
        return msg.channel.send(`Please wait ${Math.floor(
            (coins.cooldowns.hourly - Date.now()) / COMMANDS.GAME.HOURLY.millisecondsToMinutes)} minutes`)
            , RETURN_CODES.OK;

    coins.cooldowns.hourly = Date.now() + COMMANDS.GAME.HOURLY.cooldown;
    coins.coins += COMMANDS.GAME.HOURLY.coins;
    await bot.coins.put(user.id, coins);

    msg.channel.send(`Added ${COMMANDS.GAME.HOURLY.coins} coins`);

    return RETURN_CODES.OK;
}, {
    name: "Hourly",
    usage: "hourly",
    info: "Hourly"
});
