import { Client, Logger } from './contracts';

/**
 * Шина событий (коннектор)
 * Служит для соединения с вебсокет-сервером.
 */
export class EventBus<T extends object = {}> {
    constructor(
        private readonly client: Client<T>,
        private readonly connectionUrl: string,
        private readonly logger: Logger,
    ) {
        this.connectionUrl && this.connect(this.connectionUrl);
    }

    /**
     * Установка соединения с сервером
     * @param url Адрес сервера
     */
    connect(url: string) {
        try {
            this.client.connect(url);
        } catch (e) {
            this.logger.error(
                'Event connector',
                "The connection couldn't be established. Check connection url string.",
            );
        }
    }

    /**
     * Разрыв соединения с сервером
     */
    disconnect() {
        this.client.disconnect();
    }

    /**
     * Подписка на события
     * Является оберткой над методом on() передаваемого клиента
     * @param eventName Имя события
     * @param listener Обработчик события
     */
    on<K extends keyof T & string>(eventName: K, listener: T[K]) {
        try {
            this.client.on(eventName, listener);
        } catch (e) {
            this.logger.error('Event connector', 'Something went wrong subscribing on event. Check client instance.');
        }
    }

    /**
     * Отписка от события
     * Является оберткой над методом off() передаваемого клиента
     * @param eventName Имя события
     * @param listener Обработчик события
     */
    off<K extends keyof T & string>(eventName: K, listener: T[K]) {
        try {
            this.client.off(eventName, listener);
        } catch (e) {
            this.logger.error(
                'Event connector',
                'Something went wrong unsubscribing from event. Check client instance.',
            );
        }
    }

    /**
     * Получение экземпляра используемого клиента
     */
    getInstance() {
        return this.client;
    }
}
