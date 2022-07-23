import MessageEmbed from "../../Classes/MessageEmbed";
import { COMMANDS } from "../../constants";
import { Command } from "../../framework";
import STRINGS from "../../strings";

export default new Command((bot, msg) => {
    // swap this out with better logic
    // check for mention in args[0]
    // if none, check if message is a reply
    // if not, message author
    const user = msg.mentions.users.first() || msg.author;

    const embed = new MessageEmbed()
        .setColor(COMMANDS.FUN.USERINFO.embedColor)
        .setThumbnail(user.displayAvatarURL({
            extension: COMMANDS.FUN.USERINFO.extension,
            size: COMMANDS.FUN.USERINFO.size
        }))
        .setTitle(user.username);

    const member = msg.guild?.members.cache.get(user.id);
    if (member) embed.setTitle(member.displayName)
        .setColor(member.displayColor)
        .addField(STRINGS.COMMANDS.FUN.USER_INFO.JOINED_GUILD_TITLE, member.joinedAt?.toUTCString() || "")
        .addField(STRINGS.COMMANDS.FUN.USER_INFO.JOINED_DISCORD_TITLE, user.createdAt.toUTCString());

    msg.channel.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.FUN.USER_INFO.DATA.NAME,
    usage: STRINGS.COMMANDS.FUN.USER_INFO.DATA.USAGE,
    info: STRINGS.COMMANDS.FUN.USER_INFO.DATA.INFO
});
