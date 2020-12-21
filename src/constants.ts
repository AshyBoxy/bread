import { AllowedImageFormat, ImageSize, PresenceData, RoleData } from "discord.js";
import STRINGS from "./strings";

// command return codes
export const RETURN_CODES = {
    "OK": 0,
    "BAD_USAGE": 1,
    "ERROR": 2
};

// embed color seems to come up a lot
export const globalEmbedColor = 0xff00ff;

export const PRESENCE: PresenceData = {
    "activity": {
        name: STRINGS.EVENTS.READY.ACTIVITY_NAME,
        type: "WATCHING"
    },
    "status": "idle"
};

// commands
export namespace COMMANDS {
    // config commands
    export namespace CONFIG {
        // prefix command
        export namespace PREFIX {
            export const maxLength = 10;
        }
    }

    // mod commands
    export namespace MOD {
        // mute command
        export namespace MUTE {
            export const defaultLength = 5;
            export const lengthMultiplier = 60000; // milliseconds in a minute
            export const mutedRole = "Muted";
        }

        // updatemutedrole commaand
        export namespace UPDATEMUTEDROLE {
            export const mutedRole = MUTE.mutedRole;
            export const mutedData: RoleData = {
                name: mutedRole,
                permissions: 0,
                hoist: false,
                color: 0x4e4949,
                mentionable: false,
                position: 0
            };
        }

        export namespace CLEAR {
            export const maximumMessages = 50;
            export const filterOld = true;
        }
    }

    // special commands
    export namespace SPECIAL {
        // help command
        export namespace HELP {
            export const embedColor = globalEmbedColor;
        }
    }

    // fun commands
    export namespace FUN {
        // avatar command
        export namespace AVATAR {
            export const dynamic = true;
            export const format: AllowedImageFormat = "png";
            export const size: ImageSize = 2048;
            export const embedColor = globalEmbedColor;
        }

        // userinfo command
        export namespace USERINFO {
            export const dynamic = AVATAR.dynamic;
            export const format = AVATAR.format;
            export const size = AVATAR.size;
            export const embedColor = globalEmbedColor;
        }
    }

    // game commands
    export namespace GAME {
        // gamble command
        export namespace GAMBLE {
            export const minCoins = 1;
            export const winRate = .5;
        }

        // givecoins command
        export namespace GIVECOINS {
            export const minCoins = 1;
            export const maxCoins = 1000000;
        }

        // hourly command
        export namespace HOURLY {
            export const cooldown = 3600000; // milliseconds in an hour
            export const coins = 69;
            export const millisecondsToMinutes = 60000;
        }

        // slots command
        export namespace SLOTS {
            export const allText = "all";
            export const halfText = "half";
            export const minCoins = 1;
            export const winRate = .25;
            export const winningsMultiplierLow = 1.25;
            export const winningsMultiplierHigh = 2.5;
        }

        // throwcoins command
        export namespace THROWCOINS {
            export const minCoins = 1;
        }
    }
}

// utils
export namespace UTILS { }

// defaults
export namespace DEFAULTS {
    // coins
    export namespace COINS {
        export const coins = 100;
        export const hourlyCooldown = 0;
    }
}
