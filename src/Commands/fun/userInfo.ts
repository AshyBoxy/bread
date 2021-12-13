import Command from "../../Classes/Command";
import { MessageEmbed } from "discord.js";
import { COMMANDS } from "../../constants";
import STRINGS from "../../strings";

export default new Command((bot, msg) => {
    const user = msg.author;

    const embed = new MessageEmbed()
        .setColor(COMMANDS.FUN.USERINFO.embedColor)
        .setThumbnail(user.displayAvatarURL({
            dynamic: COMMANDS.FUN.USERINFO.dynamic,
            format: COMMANDS.FUN.USERINFO.format,
            size: COMMANDS.FUN.USERINFO.size
        }))
        .setTitle(user.username);
    const member = msg.guild?.members.cache.get(user.id);

    if (member) embed.setTitle(member.displayName)
        .setColor(member.displayColor)
        .addField(STRINGS.COMMANDS.FUN.USER_INFO.JOINED, member.joinedAt?.toUTCString() || "");

    msg.channel.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.FUN.USER_INFO.DATA.NAME,
    usage: STRINGS.COMMANDS.FUN.USER_INFO.DATA.USAGE,
    info: STRINGS.COMMANDS.FUN.USER_INFO.DATA.INFO
});
