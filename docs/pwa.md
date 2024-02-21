## Оглавление:

-   [Поддержка PWA](#Поддержка-PWA)
-   [Активация PWA](#Активация-PWA)
-   [Отладка PWA](#Отладка-PWA)
-   [Если поддержка PWA-режима не нужна](#Если-поддержка-PWA-режима-не-нужна)

## Поддержка PWA

Бойлерплейт является `pwa`-ready решением. Архитектура `progressive web application` построена вокруг инфраструктуры [workbox](https://developer.chrome.com/docs/workbox). `Workbox` - это набор модулей и предлагаемых готовых решений, упрощающих такие распространенные виды взаимодействия сервис-воркеров, как маршрутизация, кэширование, стратегия и прочее. Каждый модуль посвящен определенному аспекту разработки сервис-воркеров. Основная цель — максимально упростить использование сервис-воркеров, обеспечив при этом гибкость, позволяющую при необходимости учитывать сложные требования приложений.
`Workbox` предоставляет следующие возможности:

-   предварительное кеширование
-   кеширование во время выполнения
-   стратегии (кеширования)
-   обработка (перехват сетевых) запросов
-   фоновая синхронизация
-   помощь в отладке

`Workbox` предоставляет следующие плагины:

[`BackgroundSyncPlugin`](https://www.npmjs.com/package/workbox-background-sync) - при отсутствии подключения к сети запрос помещается в очередь фоновой синхронизации (background sync queue) и повторно отправляется при следующем возникновении события sync
[`BroadcastUpdatePlugin`](https://www.npmjs.com/package/workbox-broadcast-update) - при любом обновлении кеша отправляется (dispatch) сообщение в BroadcastChannel или через postMessage()
[`CacheableResponsePlugin`](https://www.npmjs.com/package/workbox-cacheable-response) - кеширование только тех запросов, которые соответствуют установленным критериям
[`ExpirationPlugin`](https://www.npmjs.com/package/workbox-expiration) - определение количества или максимального возраста записей в кеше
и некоторые другие

## Активация-PWA

По умолчанию поддержка `pwa`-режима отключена. Управление режимом происходит через переменные окружения:

-   `PWA_MODE` - булев тип. Признак поддержки PWA-режима (в `production`-режиме). Значение по дефолту: `false`
-   `SW_FILE_NAME` - наименование выходного файла севрис-воркера. Используется как в системе собрки, так и при регистрации в сервисе. Значение по дефолту: `service-worker`
-   `SW_DEVELOPMENT_MODE_ENABLE` - генерация и регистрация сервис-воркера в `dev`-режиме. По умолчанию файл сервис-воркера генерируется и регистрируется только в `production` окружении.

Поставив переменную `PWA_MODE` в `true` и выполнив сборку, подключение и регистрация сервис-воркера выполнится автоматически, если в браузере присутствует такая возможность.

В системе сборки для создания сервис-воркера используется режим `injectManifest`, который предоставляет более полный контроль над тем, как будет выглядеть финальный воркер. Этот режим более предпочтителен, нежели `GenerateSW`, когда:

-   требуется больше контроля над сервис-воркерами
-   необходимо кешировать файлы, но при этом создать собственный воркер
-   необходимо иметь больше контроля над маршрутизацией
-   имеется необходимость использовать системное API

В остальных случаях (в том числе, когда необходимо максимально просто создать pwa-приложение) предпочтение стоит отдать `generateSW`. С более подробной информацией можно ознакомиться [здесь](https://chromeextensionsdocs.appspot.com/docs/workbox/the-ways-of-workbox/).

## Отладка PWA

В случае необходимости включения и активации сервис-воркера в `development`-режиме, необходимо установить переменную окружения `SW_DEVELOPMENT_MODE_ENABLE` в значение `true`. Значение по умолчанию - `false` (cервис-воркер доступен только в `production` режиме).

## Если поддержка PWA-режима не нужна

В случае, если `pwa`-режим не требуется, достаточно просто удалить файл [sw.ts](../src/sw.ts). Если неизвестно, потребуется ли режим в будущем, файл [sw.ts](../src/sw.ts) можно оставить, но значение переменной окружения `PWA_MODE` поставить в `false` или просто не вносить переменную `PWA_MODE` в список. По умолчанию режим pwa не активирован.