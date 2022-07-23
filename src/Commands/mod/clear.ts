import { GuildCommand } from "../../framework";
import { COMMANDS } from "../../constants";
import STRINGS from "../../strings";

export default new GuildCommand(async (bot, msg, args) => {
    const deleteCount = parseInt(args[0]);
    if (!deleteCount || deleteCount > 50) return 1;
    // add 1 to account for command invocation
    const deleteResult = await msg.channel.bulkDelete(deleteCount + 1, COMMANDS.MOD.CLEAR.filterOld);

    await msg.channel.send(STRINGS.COMMANDS.MOD.CLEAR.DELETED_MESSAGES(deleteResult.size - 1))
        .then((resultMsg) => setTimeout(() => resultMsg.delete(), 2000));

    return 0;
}, {
    name: STRINGS.COMMANDS.MOD.CLEAR.DATA.NAME,
    info: STRINGS.COMMANDS.MOD.CLEAR.DATA.INFO,
    usage: STRINGS.COMMANDS.MOD.CLEAR.DATA.USAGE,
    permission: "ManageMessages"
});
