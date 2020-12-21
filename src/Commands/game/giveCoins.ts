import Command from "../../Classes/Command";
import { COMMANDS, RETURN_CODES } from "../../constants";
import { mentions } from "../../Utils";
import { getCoins } from "../../defaults";

export = new Command(async (bot, msg, args) => {
    const recip = mentions.userFromMention(bot, args[0]);
    const giver = msg.author;
    const amount = parseInt(args[1]);
    if (!recip || !amount) return RETURN_CODES.BAD_USAGE;

    if (recip.id === giver.id) return msg.channel.send("Why would you give your coins to yourself"), RETURN_CODES.OK;

    let giverCoins = await bot.coins.get(giver.id);
    let recipCoins = await bot.coins.get(recip.id);

    if (!giverCoins) giverCoins = getCoins(giver.id);
    if (!recipCoins) recipCoins = getCoins(recip.id);

    if (amount < COMMANDS.GAME.GIVECOINS.minCoins)
        return msg.channel.send(`Give at least ${COMMANDS.GAME.GIVECOINS.minCoins} coins`), RETURN_CODES.OK;
    if (amount > COMMANDS.GAME.GIVECOINS.maxCoins) return msg.channel.send(`You can only give up to ${COMMANDS.GAME.GIVECOINS.maxCoins} coins at once`), RETURN_CODES.OK;
    if (giverCoins.coins < amount) return msg.channel.send(`You only have ${giverCoins.coins} coins`), RETURN_CODES.OK;

    giverCoins.coins -= amount;
    recipCoins.coins += amount;

    await Promise.all([
        bot.coins.put(giver.id, giverCoins), bot.coins.put(recip.id, recipCoins)
    ]);

    msg.channel.send(`Gave ${amount} coins to ${recip}`);

    return RETURN_CODES.OK;
}, {
    "name": "GiveCoins",
    "usage": "givecoins <@user> <amount>",
    "info": "GiveCoins"
});
