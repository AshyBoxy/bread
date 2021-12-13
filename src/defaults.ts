import { DEFAULTS } from "./constants";
import ICoins from "./Interfaces/Coins";

const getCoins = (id: string): ICoins => {
    return {
        id: id,
        coins: DEFAULTS.COINS.coins,
        cooldowns: {
            hourly: DEFAULTS.COINS.hourlyCooldown
        }
    };
};

export { getCoins };
