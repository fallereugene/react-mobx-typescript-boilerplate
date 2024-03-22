export type Logger = {
    info(groupName: string, payload: any): void;
    warn(groupName: string, payload: any): void;
    error(groupName: string, payload: any): void;
    debug(groupName: string, payload: any): void;
};
