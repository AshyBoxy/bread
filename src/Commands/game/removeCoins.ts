import Command from "../../Classes/Command";
import { COMMANDS, RETURN_CODES } from "../../constants";
import { mentions } from "../../Utils";
import { getCoins } from "../../defaults";

export = new Command(async (bot, msg, args) => {
    const user = mentions.userFromMention(bot, args[0]);
    const amount = parseInt(args[1]);
    if (!user || !amount) return RETURN_CODES.BAD_USAGE;
    if (amount < COMMANDS.GAME.GIVECOINS.minCoins)
        return msg.channel.send(`Remove at least ${COMMANDS.GAME.GIVECOINS.minCoins} coins`), RETURN_CODES.OK;

    let coins = await bot.coins.get(user.id);
    if (!coins) coins = getCoins(user.id);

    coins.coins -= amount;
    if (coins.coins < 0) coins.coins = 0;
    await bot.coins.put(user.id, coins);

    msg.channel.send(`Removed ${amount} coins from ${user}`);

    return RETURN_CODES.OK;
}, {
    "name": "RemoveCoins",
    "usage": "removecoins <@user> <amount>",
    "info": "RemoveCoins",
    "permission": "MANAGE_GUILD"
});
