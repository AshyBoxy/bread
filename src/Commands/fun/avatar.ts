import MessageEmbed from "../../Classes/MessageEmbed";
import { COMMANDS } from "../../constants";
import { Command } from "../../framework";
import STRINGS from "../../strings";

export default new Command((bot, msg) => {
    const user = msg.mentions.users.first() || msg.author;
    const member = msg.guild?.members.cache.get(user.id);

    const embed = new MessageEmbed()
        .setImage(user.displayAvatarURL({
            extension: COMMANDS.FUN.AVATAR.extension,
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
