import IModule from "./Module";

export default interface ICommandData {
    name: string;
    info?: string;
    usage?: string;
    aliases?: string[];

    disabled?: boolean;

    module?: IModule;
}
