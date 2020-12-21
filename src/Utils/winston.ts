import { createLogger, format, LoggerOptions, transports } from "winston";
import * as Transport from "winston-transport";
import IWinstonTransportInfo from "../Interfaces/WinstonTransportInfo";
import { WebhookClient } from "discord.js";
import config from "../config";

const webhook = new WebhookClient(config.winston.webhook.id, config.winston.webhook.token, {
    "disableMentions": "all"
});

const consoleSettings: transports.ConsoleTransportOptions = {
    "level": "silly",
    "format": format.combine(
        format.colorize(),
        format.timestamp({
            "format": "ddd MMM DD YYYY HH:mm:ss ZZ"
        }),
        format.printf(({ level, message, timestamp, ...rest }) => `${timestamp} - ${level}: ${message} (${JSON.stringify(rest)})`)
    )
};

const webhookSettings: Transport.TransportStreamOptions = {
    "level": "silly",
    "format": format.combine(
        format.timestamp({
            "format": "ddd MMM DD YYYY HH:mm:ss ZZ"
        })
    )
};

class DiscordWebhook extends Transport {
    constructor(opts?: Transport.TransportStreamOptions) {
        super(opts);
    }

    log(info: IWinstonTransportInfo, callback: () => void): void {
        setImmediate(() => {
            this.emit("logged", info);
        });

        const { level, message, timestamp, ...rest } = info;

        // eslint-disable-next-line no-console
        webhook.send(`>>> ${timestamp} - ${level}: ${message} (${JSON.stringify(rest)})`).catch(console.error);

        callback();
    }
}

const settings: LoggerOptions = {
    "transports": [
        new transports.Console(consoleSettings),
        new DiscordWebhook(webhookSettings)
    ]
};

const logger = createLogger(settings);

export default logger;
