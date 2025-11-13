import { COMMANDS } from "../../constants";
import { Command, BreadEmbed, ArgumentsBuilder } from "../../framework";
import STRINGS from "../../strings";

export default new Command((bot, ctx, args) => {
    const user = args.getUser() || ctx.user;

    const embed = new BreadEmbed()
        .setColor(COMMANDS.FUN.USERINFO.embedColor)
        .setThumbnail(user.displayAvatarURL({
            extension: COMMANDS.FUN.USERINFO.extension,
            size: COMMANDS.FUN.USERINFO.size
        }))
        .setTitle(user.username);

    const member = ctx.guild?.members.cache.get(user.id);
    if (member) embed.setTitle(member.displayName)
        .setColor(member.displayColor)
        .addField(STRINGS.COMMANDS.FUN.USER_INFO.JOINED_GUILD_TITLE, member.joinedAt?.toUTCString() || "")
        .addField(STRINGS.COMMANDS.FUN.USER_INFO.JOINED_DISCORD_TITLE, user.createdAt.toUTCString());

    ctx.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.FUN.USER_INFO.DATA.NAME,
    usage: STRINGS.COMMANDS.FUN.USER_INFO.DATA.USAGE,
    info: STRINGS.COMMANDS.FUN.USER_INFO.DATA.INFO,
    args: new ArgumentsBuilder()
        .addUser("user")
});
