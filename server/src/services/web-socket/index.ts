import { injectable, inject } from 'inversify';
import { WebSocketServer, Server, WebSocket } from 'ws';
import { ContainerIoC } from '../../constants/index.js';
import { IConfig } from '../config/contracts/index.js';

@injectable()
export class WebSocketService {
    private ws!: Server;
    private hubConnectionPort!: number;
    private instance!: WebSocket;

    constructor(@inject(ContainerIoC.ConfigService) configService: IConfig) {
        this.hubConnectionPort = configService.get('WEB_SOCKET_HUB_CONNECTION_PORT');
    }

    /**
     * Получение инстанса
     * @returns
     */
    getInstance() {
        return this.instance;
    }

    /**
     * Установка соединения
     * Добавление сервера и соответствующего порта
     */
    connect() {
        this.ws = new WebSocketServer({ port: this.hubConnectionPort });
        this.attachEvents();
    }

    /**
     * Подписка на базовые события соединения
     */
    private attachEvents() {
        this.ws.on('connection', (ws) => {
            console.log('Connection active.');
            this.instance = ws;
            ws.on('close', (reason: string) => {
                console.log('Connection closed with reason ', reason);
            });
        });
    }
}
