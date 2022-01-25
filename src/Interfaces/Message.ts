import { Message } from "discord.js";
import CustomClient from "../Classes/Client";

export default interface CustomMessage extends Message {
    client: CustomClient;
}
