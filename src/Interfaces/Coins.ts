export default interface ICoins {
    id: string;
    coins: number;
    cooldowns: {
        hourly: number;
    };
}
