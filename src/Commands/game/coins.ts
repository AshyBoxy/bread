import Command from "../../Classes/Command";
import { mentions } from "../../Utils";
import { getCoins } from "../../defaults";

export default new Command(async (bot, msg, args) => {
    const user = mentions.userFromMention(bot, args[0]) || msg.author;
    let coins = await bot.coins.get(user.id);
    if (!coins) {
        coins = getCoins(user.id);
        await bot.coins.put(user.id, coins);
    }

    msg.channel.send(`${user}'s coins: ${coins.coins}`);
}, {
    name: "Coins",
    usage: "coins [@user]",
    info: "Coins",
    aliases: ["money"]
});
