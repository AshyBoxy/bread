import ICommandData from "./CommandData";
import { PermissionResolvable } from "discord.js";

export default interface IGuildCommandData extends ICommandData {
    permission?: PermissionResolvable;
    botPermission?: PermissionResolvable;
}
