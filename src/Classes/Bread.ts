import IBreadData from "../Interfaces/BreadData";
import { Message } from "../framework";
import IUserData from "../Interfaces/UserData";

class Bread {
    constructor(public key: string, public data: IBreadData, public run: (msg: Message, userData: IUserData & { breadCollection: Record<string, number | undefined>; }) => Promise<void> | void = (): void => undefined) {
        // empty constructor here is fine
    }
}
export default Bread;
