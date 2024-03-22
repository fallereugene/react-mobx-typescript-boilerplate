import { Workbox } from 'workbox-window';
import { Logger } from './contracts';

/**
 * Сервис регистрации сервис-воркера.
 */
export class ServiceWorker {
    private static IS_SERVICE_AVAILABLE: boolean = 'serviceWorker' in navigator;

    private wb: Workbox;

    constructor(private readonly swPath: string, private readonly logger: Logger) {}

    /**
     * Регистрация сервис-воркера
     * Сервис не содержит логику подписки или обслуживания тех или иных событий.
     * Подписка и логика самих воркеров находится в файле sw.ts и соответствующих воркерах.
     */
    register() {
        try {
            this.wb = new Workbox(this.swPath);
            this.wb
                .register()
                .then((registration) => {
                    if (!registration) {
                        return;
                    }
                    this.logger.info('Service worker.', 'Service worker registered successfully.');
                    registration.addEventListener('updatefound', () => {
                        const installingWorker = registration.installing;
                        if (installingWorker == null) {
                            return;
                        }
                        installingWorker.addEventListener('statechange', () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // At this point, the updated precached content has been fetched,
                                    // but the previous service worker will still serve the older
                                    // content until all client tabs are closed.
                                    this.logger.info(
                                        'Service worker.',
                                        'New content is available and will be used when all tabs are closed.',
                                    );
                                } else {
                                    // At this point, everything has been precached.
                                    // It's the perfect time to display a
                                    // "Content is cached for offline use." message.
                                    this.logger.info('Service worker.', 'Content is cached for offline use.');
                                }
                            }
                        });
                    });
                })
                .catch((error) => {
                    this.logger.error(
                        'Service worker error',
                        'Something went wrong during service worker registration.',
                    );
                    this.logger.error('Service worker error', error.message);
                });
        } catch (e) {
            this.logger.error('Service worker error', 'Something went wrong.');
            this.logger.error('Service worker error', e.message);
        }
    }

    /**
     * Удаление зарегистрированного ранее сервис-воркера
     * Вместе с воркером происходит также удаление ключей кэша
     */
    unregister() {
        if (!ServiceWorker.IS_SERVICE_AVAILABLE) {
            this.logger.info('Service worker.', 'No serviceWorker found.');
            return;
        }

        navigator.serviceWorker
            .getRegistrations()
            .then((registrations) => {
                if (!registrations.length) {
                    return;
                }
                // eslint-disable-next-line
                for (let registration of registrations) {
                    registration.unregister();
                }
                this.clearCache();
                this.logger.info('Service worker unregister process.', 'Service worker unregistered successfully.');
            })
            .catch((error) => {
                this.logger.error('Service worker error', 'Something went wrong during unregister process.');
                this.logger.error('Service worker error', error.message);
            });
    }

    /**
     * Очищение ключей кэша
     * Метод вызывается в процессе удаления зарегистрированного сервис-воркера.
     */
    private async clearCache() {
        this.logger.info('Service worker.', 'Clearing cache store...');
        const cacheKeys = await caches.keys();

        // eslint-disable-next-line
        for (const key of cacheKeys) {
            caches.delete(key);
        }
        this.logger.info('Service worker.', 'Cache store was cleared successfully.');
    }
}
