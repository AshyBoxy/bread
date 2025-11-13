import { COMMANDS } from "../../constants";
import { Command, BreadEmbed, ArgumentsBuilder } from "../../framework";
import STRINGS from "../../strings";

export default new Command((bot, ctx, args) => {
    const user = args.getMention() || ctx.user;
    const member = ctx.guild?.members.cache.get(user.id);

    const embed = new BreadEmbed()
        .setImage(user.displayAvatarURL({
            extension: COMMANDS.FUN.AVATAR.extension,
            size: COMMANDS.FUN.AVATAR.size
        }))
        .setColor(member ? member.displayColor : COMMANDS.FUN.AVATAR.embedColor);

    ctx.send({ embeds: [embed] });
}, {
    name: STRINGS.COMMANDS.FUN.AVATAR.DATA.NAME,
    info: STRINGS.COMMANDS.FUN.AVATAR.DATA.INFO,
    usage: STRINGS.COMMANDS.FUN.AVATAR.DATA.USAGE,
    aliases: STRINGS.COMMANDS.FUN.AVATAR.DATA.ALIASES,
    args: new ArgumentsBuilder()
        .addMention()
});
