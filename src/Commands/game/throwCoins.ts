import Command from "../../Classes/Command";
import { COMMANDS, RETURN_CODES } from "../../constants";
import { getCoins } from "../../defaults";

export = new Command(async (bot, msg, args) => {
    const amount = parseInt(args[0]);
    if (!amount) return RETURN_CODES.BAD_USAGE;

    let coins = await bot.coins.get(msg.author.id);
    if (!coins) coins = getCoins(msg.author.id);


    if (amount < COMMANDS.GAME.THROWCOINS.minCoins)
        return msg.channel.send(`Throw at least ${COMMANDS.GAME.THROWCOINS.minCoins} coins`), RETURN_CODES.OK;

    coins.coins -= amount;
    if (coins.coins < 0) coins.coins = 0;
    await bot.coins.put(msg.author.id, coins);

    msg.channel.send(`Threw away ${amount} coins`);

    return RETURN_CODES.OK;
}, {
    "name": "ThrowCoins",
    "usage": "throwcoins <amount>",
    "info": "ThrowCoins",
    "aliases": ["yeetcoins"]
});
