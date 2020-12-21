export default interface IConfig {
    prefix: string;
    token: string;
    winston: {
        webhook: {
            "id": string;
            "token": string;
        };
    };
    eventsPath: string;
    commandsPath: string;
}
