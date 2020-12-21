import IStrings from "./Strings";

const _STRINGS: IStrings = {
    CLASSES: {
        CLIENT: {
            LOADED: {
                EVENTS: (events): string => `loaded events: ${events.join(", ")}`,
                MODULES: (modules): string => `loaded modules: ${modules.join("; ")}`
            },
            WARNING: {
                COMMAND: (cmdName, moduleName): string =>
                    `command ${cmdName} in module ${moduleName} has no run function or name`
            }
        }
    },
    UTILS: {
        DISCORD: {
            DISABLED: "This command is currently disabled!",
            GUILD_ONLY: "This command can only be used in a server!",
            DM_ONLY: "This command can only be used in DMs!",
            BAD_PERMISSIONS: "You don't have the required permissions to use this command!",
            BAD_USAGE: (prefix, usage): string => `Usage: ${prefix}${usage}`,
            ERROR: "There was an error processing that command! Please try again."
        }
    },
    MAIN: {
        SHUTTING_DOWN: (reason): string => `Shutting Down: ${reason}`,
        SIGINT: "Recieved SIGINT",
        SIGTERM: "Recieved SIGTERM"
    },
    EVENTS: {
        READY: {
            ONLINE: (tag): string => `Online as ${tag}`,
            ACTIVITY_NAME: "All Hail Bread 🍞"
        },
        MESSAGE: {
            PREFIX: (prefix): string => `My prefix is \`${prefix}\``,
            HELLO: (author): string => `Oh Shit! What Up <@${author}>!`
        }
    },
    COMMANDS: {
        CONFIG: {
            PREFIX: {
                DATA: {
                    NAME: "Prefix",
                    USAGE: "prefix <prefix>",
                    INFO: "Sets the server's prefix"
                },
                TOO_LONG: (maxLength): string => `A prefix cannot be longer than ${maxLength} characters!`
            }
        },
        FUN: {
            AVATAR: {
                DATA: {
                    NAME: "Avatar",
                    USAGE: "avatar [@user]",
                    INFO: "Shows a user's avatar",
                    ALIASES: [
                        "av",
                        "a",
                        "pfp"
                    ]
                }
            },
            BIBLE: {
                DATA: {
                    NAME: "Bible",
                    USAGE: "bible",
                    INFO: "Bible."
                }
            },
            USER_INFO: {
                DATA: {
                    NAME: "UserInfo",
                    USAGE: "userinfo [@user]",
                    INFO: "Shows a user's information"
                },
                JOINED: "Joined Server At"
            }
        },
        MOD: {
            CLEAR: {
                DATA: {
                    NAME: "Clear",
                    INFO: "Clears messages",
                    USAGE: "clear <amount of messages to clear (maximum of 50)>"
                },
                DELETED_MESSAGES: (deletedCount): string => `Deleted ${deletedCount} messages!`
            }
        }
    }
};

const strings = {
    "STRINGS": _STRINGS
};
const selectedName = "STRINGS";
const STRINGS = strings[selectedName];

export default STRINGS;
