import { ClientEvents } from "discord.js";
import CustomClient from "./Client";

type Events = keyof ClientEvents;
type Execute<EventName extends Events> = (bot: CustomClient) => (...args: ClientEvents[EventName]) => void;

class EventHandler<EventName extends Events> {
    execute: Execute<EventName>;

    name: keyof ClientEvents;

    constructor(name: EventName, execute: Execute<EventName>) {
        this.execute = execute;
        this.name = name;
    }
}

export default EventHandler;
