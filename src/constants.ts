import { ImageExtension, ImageSize } from "@discordjs/rest";
import { ActivityType, PresenceData, RoleData } from "discord.js";
import Bread from "./Classes/Bread";
import STRINGS from "./strings";
import { msgReact, roll } from "./Utils/react";
// import { strings } from "./framework";

// replace namespace hell with something else
// also consider consolidating recurring constants

// embed color seems to come up a lot
export const globalEmbedColor = 0xff00ff;

// this should absolutely not be in constants
// maybe treat them more like how commands are? (dynamically loaded)
const catBread = new Bread("catbread", {
    emoji: "1148112615747358730"
}, (msg, userData) => {
    const c: string = msg.content.toLowerCase();
    let g: boolean = false;
    if (c.includes("uwu")) g = g || roll(2);
    if (c.includes("nya")) g = g || roll(4);
    if (c.includes("cat")) g = g || roll(100);
    if (!g) return;
    userData.breadCollection[catBread.key] = (userData.breadCollection[catBread.key] || 0) + 1;
    msgReact(msg, catBread.data.emoji);
    // msg.channel.send(strings.get("bread.breads.catbread.got", msg.author.id));
});


export const Breads: Bread[] = [catBread];

export const PRESENCE: PresenceData = {
    activities: [{
        name: STRINGS.EVENTS.READY.ACTIVITY_NAME,
        type: ActivityType.Watching
    }],
    status: "idle"
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
                permissions: 0n,
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
            export const extension: ImageExtension = "png";
            export const size: ImageSize = 2048;
            export const embedColor = globalEmbedColor;
        }

        // userinfo command
        export namespace USERINFO {
            export const extension = AVATAR.extension;
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
