export type Client<T extends Record<string, any>> = {
    connect(url: string): void;
    disconnect(): void;
    on<K extends keyof T & string>(eventName: K, listener: T[K]): void;
    off<K extends keyof T & string>(eventName: K, listener: T[K]): void;
};
