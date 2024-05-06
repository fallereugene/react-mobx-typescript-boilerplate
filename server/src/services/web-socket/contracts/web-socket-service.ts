import { WebSocket } from 'ws';

export type IWebSocketService = {
    getInstance(): WebSocket;
    connect(): void;
};
