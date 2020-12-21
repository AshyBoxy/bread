import { Message, Guild } from "discord.js";

export default interface IGuildMessage extends Message {
    guild: Guild;
}
