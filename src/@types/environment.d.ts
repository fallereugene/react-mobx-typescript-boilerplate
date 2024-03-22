import classnames from 'classnames';
import * as _react from 'react';
import * as _reactDOM from 'react-dom';

declare global {
    const React: typeof _react;
    const cx: typeof classnames;
    const ReactDOM: typeof _reactDOM;
    const JSX: React.ElementType;
    namespace NodeJS {
        interface ProcessEnv {
            // Базовый путь API
            BASE_API_URL: string;
            // Признак сборки приложения
            IS_PRODUCTION_MODE: boolean;
            // Признак поддержки PWA-режима
            PWA_MODE: string;
            // Наименование выходного файла севрис-воркера. Используется как в системе собрки,
            // так и при регистрации sw-сервиса.
            SW_FILE_NAME: string;
            // Регистрация и обработка файла сервис-воркера в development-режиме
            SW_DEVELOPMENT_MODE_ENABLE: string;
            // Уровень логгирования
            // Поддерживаются следующие уровни логгирования: error (0), warn (1), info (2), debug (3).
            LOGLEVEL: string;
        }
    }
}

export {};
