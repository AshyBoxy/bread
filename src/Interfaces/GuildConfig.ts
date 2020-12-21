import IReactionRoleConfig from "./ReactionRoleConfig";

export default interface IGuildConfig {
    prefix?: string;
    disabledCommands?: string[];
    reactionRoles?: IReactionRoleConfig[];
}
