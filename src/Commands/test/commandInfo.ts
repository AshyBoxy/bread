import { BreadEmbed, Command, strings } from "../../framework";
import { RETURN_CODES } from "../../framework";

export default new Command((bot, msg, args) => {
    if (args.length < 1) return RETURN_CODES.BAD_USAGE;

    const command = bot.commandByName(args[0]);
    if (!command) {
        msg.reply(strings.get("bread.commands.test.commandInfo.nosuchcommand"));
        return RETURN_CODES.OK;
    }

    const embed = new BreadEmbed()
        .setTitle(`${command.getName()} (${command.name})`)
        .addField("NS", command.ns, true)
        .addField("ID", command.id, true)
        .addField("Full ID", command.getFullId(), true)
        .addField("Info", `${command.getInfo()} (${command.info})`, true)
        .addField("Usage", `${command.getUsage()} (${command.usage})`, true)
        .addField("Aliases", command.aliases.join(", "), true)
        .addField("Bot Permission", command.botPermission.toString(), true)
        .addField("Permission", command.permission.toString(), true)
        .addField("Guild Only", String(command.guildOnly), true)
        .addField("DM Only", String(command.dmOnly), true)
        .addField("Disabled", String(command.disabled), true);

    msg.reply({ embeds: [embed] });

    return RETURN_CODES.OK;
});
