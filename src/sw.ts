/// <reference lib="webworker" />

/**
 * Базовый пример сервис-воркера
 * В основе работы с сервис-воркерами (стратегии, кэширование, инвалидация и прочее) лежит экосистема workbox.
 * @see https://developers.google.com/web/tools/workbox/modules
 *
 * В случае, если приложение не предусматривает работу с сервис-воркерами, этот файл можно просто удалить и
 * шаг инициализации воркеров будет также пропущен. Также активация поддержки pwa может осуществляться
 * через переменные окружения.
 *
 * Ниже приведены некоторые примеры рантайм-кэширования запросов с различными стратегиями.
 * Эти примеры не являются эталонными и могут быть кастомизированы (например,
 * изменены стратегии, расширения файлов, критерии проверки и т.д.) или удалены в зависимости от требования проекта.
 * Так как приложение не предусматривает осуществление запросов в какой-либо внешний сервис,
 * то работоспособность данного примера можно наблюдать, например, включив сервис воркер
 * в базовую конфигурацию системы сборки. По умолчанию сервис воркер регист рируется в prod-окружении(сборке).
 *
 * В приведенных примерах не рассматривается вопрос организации воркеров.
 */

import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Прекэширование всех артефактов, генерируемых в процессе сборки.
// eslint-disable-next-line
precacheAndRoute(self.__WB_MANIFEST);

// Кэширование изображений
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
            }),
        ],
    }),
);

// Кэширование запрашиваемых шрифтов
registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    }),
);

/**
 * 4xx or 5xx коды сетевых ошибок не приводят к автоматическому обслуживанию кэша.
 * Для того, чтобы, например, вернуть ответ при невозможности обработки ответа сервером (504 код ошибки),
 * необходимо создавать свой кастомный плагин (customRequestHandler - простой базовый пример).
 */

const customRequestHandler = {
    fetchDidSucceed: async ({ response }: { response: Response }) => {
        // диапазон 2xx кодов ответа сервера
        if (response.ok) {
            return response;
        }
        throw new Error(`${response.status} ${response.statusText}`);
    },
};

// Пример кэширования сетевого ответа
registerRoute(
    ({ url }) => url.origin === 'http://127.0.0.1:8080' && url.pathname.includes('api'),
    new NetworkFirst({
        cacheName: 'tasks-response-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            customRequestHandler,
        ],
    }),
);

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
