import { Client } from "../framework";

export default interface Sub {
    load?(bot: Client): Promise<void> | void;
}
