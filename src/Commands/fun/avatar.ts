import { MessageEmbed } from "discord.js";
import { Command } from "../../framework";
import { COMMANDS } from "../../constants";
import STRINGS from "../../strings";

export default new Command((bot, msg) => {
    const user = msg.mentions.users.first() || msg.author;
    const member = msg.guild?.members.cache.get(user.id);

    const embed = new MessageEmbed()
        .setImage(user.displayAvatarURL({
            dynamic: COMMANDS.FUN.AVATAR.dynamic,
            format: COMMANDS.FUN.AVATAR.format,
            size: COMMANDS.FUN.AVATAR.size
        }))
        .setColor(member ? member.displayColor : COMMANDS.FUN.AVATAR.embedColor);

    msg.channel.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.FUN.AVATAR.DATA.NAME,
    info: STRINGS.COMMANDS.FUN.AVATAR.DATA.INFO,
    usage: STRINGS.COMMANDS.FUN.AVATAR.DATA.USAGE,
    aliases: STRINGS.COMMANDS.FUN.AVATAR.DATA.ALIASES
});
