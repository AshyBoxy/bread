export interface CLASSES {
    CLIENT: {
        LOADED: {
            EVENTS: (events: string[]) => string;
            MODULES: (modules: string[]) => string;
        };
        WARNING: {
            COMMAND: (commandName: string, modulename: string) => string;
        };
    };
}

export interface UTILS {
    DISCORD: {
        DISABLED: string;
        GUILD_ONLY: string;
        DM_ONLY: string;
        BAD_PERMISSIONS: string;
        BAD_USAGE: (prefix: string, usage: string) => string;
        ERROR: string;
    };
}

export interface MAIN {
    SHUTTING_DOWN: (reason: string) => string;
    SIGINT: string;
    SIGTERM: string;
}

export interface EVENTS {
    READY: {
        ONLINE: (tag: string) => string;
        ACTIVITY_NAME: string;
    };
    MESSAGE: {
        PREFIX: (prefix: string) => string;
        HELLO: (authorId: string) => string;
    };
}

export interface COMMANDS {
    CONFIG: {
        PREFIX: {
            DATA: {
                NAME: string;
                USAGE: string;
                INFO: string;
            };
            TOO_LONG: (maxLength: string) => string;
        };
    };
    FUN: {
        AVATAR: {
            DATA: {
                NAME: string;
                USAGE: string;
                INFO: string;
                ALIASES: string[];
            };
        };
        BIBLE: {
            DATA: {
                NAME: string;
                USAGE: string;
                INFO: string;
            };
        },
        USER_INFO: {
            DATA: {
                NAME: string;
                USAGE: string;
                INFO: string;
            };
            JOINED: string;
        };
    };
}

export interface WEB {
    ONLINE: string;
}

export interface IStrings {
    CLASSES: CLASSES;
    UTILS: UTILS;
    MAIN: MAIN;
    EVENTS: EVENTS;
    COMMANDS: COMMANDS;
    WEB: WEB;
}

export default IStrings;
