import Command from "../../Classes/Command";
import { COMMANDS, RETURN_CODES } from "../../constants";
import { getCoins } from "../../defaults";
import randomNumber from "../../Utils/randomNumber";

export = new Command(async (bot, msg, args) => {
    const user = msg.author;
    let coins = await bot.coins.get(user.id);
    if (!coins) coins = getCoins(user.id);
    if (coins.coins === 0) return msg.channel.send("You have no coins"), RETURN_CODES.OK;

    let amount = parseInt(args[0]);
    switch (args[0]) {
        case COMMANDS.GAME.SLOTS.allText:
            amount = coins.coins;
            break;
        case COMMANDS.GAME.SLOTS.halfText:
            amount = Math.floor(coins.coins / 2);
            if (coins.coins === 1) amount = 1;
            break;
        default:
            break;
    }
    if (!amount) return RETURN_CODES.BAD_USAGE;
    if (amount < COMMANDS.GAME.SLOTS.minCoins)
        return msg.channel.send(`Gamble at least ${COMMANDS.GAME.SLOTS.minCoins} coins`), RETURN_CODES.OK;
    if (amount > coins.coins) return msg.channel.send(`You only have ${coins.coins} coins`), RETURN_CODES.OK;

    let winRate = COMMANDS.GAME.SLOTS.winRate;

    // nord
    if (msg.author.id === "183284612573822976") winRate = .9;
    // nick
    if (msg.author.id === "577483620244258825") winRate = 1;

    const win = Math.random() < winRate;

    let message: string;

    if (win) {
        const winnings = Math.round(amount * randomNumber(
            COMMANDS.GAME.SLOTS.winningsMultiplierLow,
            COMMANDS.GAME.SLOTS.winningsMultiplierHigh)
        );
        message = `Winner! You won ${winnings} coins`;
        coins.coins += winnings;
    } else {
        message = `Ouch. You lost ${amount} coins`;
        coins.coins -= amount;
        if (coins.coins < 0) coins.coins = 0;
    }

    await bot.coins.put(user.id, coins);

    msg.channel.send(message);
    return RETURN_CODES.OK;
}, {
    "name": "Slots",
    "usage": "slots <amount>",
    "info": "Slots"
});
