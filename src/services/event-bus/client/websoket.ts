import EE from 'events';
import { Logger } from '@services/logger';
import { AvailableEvent } from '@/contracts';
import { Client } from '../contracts';

export class WebSocketClient<T extends Record<string, any>> extends EE implements Client<T> {
    /**
     * Таймаут попытки переподключения к вебсокет-серверу
     * при обрыве/закрытии соединения
     */
    private static readonly RECONNECTION_TIMEOUT = 5000;

    /**
     * Экземпляр вебсокета
     */
    private ws: WebSocket;

    /**
     * Адрес вебсокет-сервера, с которым устанавливается соединение
     */
    private url: string;

    /**
     * Идентификатор интервала соединения
     */
    private timerId: ReturnType<typeof setInterval> | null = null;

    constructor(private readonly logger: Logger) {
        super();
    }

    /**
     * Метод соединения с сервером
     * @param url Адрес вебсокет-сервера
     */
    connect(url: string) {
        this.logger.info('ws client', `connecting: ${url}`);
        this.url = url;
        this.ws = new WebSocket(this.url);
        this.bindContext();
        this.addEvents();
    }

    /**
     * Разрыв соединения с сервером
     */
    async disconnect(): Promise<void> {
        this.logger.info('ws client', `disconnecting: ${this.url}`);
        this.ws.close();
    }

    /**
     * Подписка на событие
     * @param eventName Имя события
     * @param listener Обработчик события
     */
    on<K extends keyof T & string>(eventName: K, listener: T[K]): this {
        super.on(eventName, listener);
        return this;
    }

    /**
     * Отписка от события
     * @param eventName Имя события
     * @param listener Обработчик события
     */
    off<K extends keyof T & string>(eventName: K, listener: T[K]): this {
        super.off(eventName, listener);
        return this;
    }

    /**
     * Биндинг контекста
     */
    private bindContext() {
        this.onMessage = this.onMessage.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onError = this.onError.bind(this);
    }

    /**
     * Добавление обработчиков событий
     */
    private addEvents() {
        this.ws.addEventListener('open', this.onOpen);
        this.ws.addEventListener('close', this.onClose);
        this.ws.addEventListener('error', this.onError);
        this.ws.addEventListener('message', this.onMessage);
    }

    /**
     * Обработчик установки соединения
     */
    private onOpen() {
        this.logger.info('ws client: onOpen', `connection opened: ${this.url}`);
        this.timerId && clearInterval(this.timerId);
    }

    /**
     * Обработчик закрытия соединения
     */
    private onClose() {
        this.logger.warn('ws client: onClose', `connection closed: ${this.url}`);
        this.timerId && clearInterval(this.timerId);
        this.timerId = setInterval(() => this.connect(this.url), WebSocketClient.RECONNECTION_TIMEOUT);
    }

    /**
     * Обработчик ошибки
     * @param event Данные об ошибке
     */
    private onError(event: Event) {
        this.logger.error('ws client: onError', event);
    }

    /**
     * Обработчик получения данных
     * @param event Данные
     */
    private onMessage(event: MessageEvent<any>) {
        try {
            const { payload } = JSON.parse(event.data);
            this.logger.debug('ws client onMessage', { payload });
            const EVENT_NAME: keyof AvailableEvent = 'known_event_name';

            super.emit(EVENT_NAME, payload);
        } catch (e) {
            this.logger.error('ws client exception: onMessage error', event.data);
        }
    }
}
