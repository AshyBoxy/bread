import Command from "../../Classes/Command";
import { COMMANDS, RETURN_CODES } from "../../constants";
import { mentions } from "../../Utils";
import { getCoins } from "../../defaults";

export = new Command(async (bot, msg, args) => {
    const recip = mentions.userFromMention(bot, args[0]);
    const amount = parseInt(args[1]);
    if (!recip || !amount) return RETURN_CODES.BAD_USAGE;

    let recipCoins = await bot.coins.get(recip.id);
    if (!recipCoins) recipCoins = getCoins(recip.id);

    if (amount < COMMANDS.GAME.GIVECOINS.minCoins)
        return msg.channel.send(`Give at least ${COMMANDS.GAME.GIVECOINS.minCoins} coins`), RETURN_CODES.OK;
    if (amount > COMMANDS.GAME.GIVECOINS.maxCoins)
        return msg.channel.send(`You can only give up to ${COMMANDS.GAME.GIVECOINS.maxCoins} coins at once`)
            , RETURN_CODES.OK;

    recipCoins.coins += amount;
    await bot.coins.put(recip.id, recipCoins);

    msg.channel.send(`Gave ${amount} coins to ${recip}`);

    return RETURN_CODES.OK;
}, {
    "name": "GiveCoinsMod",
    "usage": "givecoinsmod <@user> <amount>",
    "info": "GiveCoinsMod",
    "permission": "MANAGE_GUILD"
});
