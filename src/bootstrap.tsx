import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { enableLogging } from 'mobx-logger';
import { configure } from 'mobx';
import { ErrorBoundary } from '@components/error-boundary';
import { Root } from '@containers/root';
import { ThemeProvider } from '@mui/material';
import { Store } from '@services/store';
import { Api, setInterceptors } from '@services/api';
import httpService from '@services/http';
import { Config } from '@services/config';
import { Logger } from '@services/logger';
import { ServiceWorker } from '@services/service-worker';
import theme from '@/theme';
import i18n from './i18n';

const { IS_PRODUCTION_MODE, BASE_API_URL, PWA_MODE, SW_FILE_NAME, SW_DEVELOPMENT_MODE_ENABLE } = Config.getConfig();

if (!IS_PRODUCTION_MODE) {
    enableLogging({
        action: true,
        reaction: true,
        transaction: true,
        compute: true,
    });
    configure({
        // This gives you good warnings to read in the console
        computedRequiresReaction: true,
        reactionRequiresObservable: true,
    });
}

const logger = new Logger(Config.getConfig().LOGLEVEL);
const StoreContext = React.createContext<Store>({} as Store);
const store = new Store(new Api(httpService).configure({ baseUrl: BASE_API_URL }));
const sw = new ServiceWorker(`${SW_FILE_NAME}.js`, logger);

// Регистрация сервис-воркеров и активация поддержки PWA-режима.
// Файл сервис-воркера обрабатывается и генерируется в процессе сборки проекта.
// В результате происходит также процесс прекэширования.
// Название выходного файла может конфигурироваться через переменные окружения.
if ((IS_PRODUCTION_MODE || SW_DEVELOPMENT_MODE_ENABLE) && PWA_MODE) {
    sw.register();
}
!PWA_MODE && sw.unregister();

setInterceptors(httpService, {
    onResponseError: store.rootStore.responseErrorInterceptor,
});

const renderApplication = (Component: React.ElementType) => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <ThemeProvider theme={theme}>
                <StoreContext.Provider value={store}>
                    <ErrorBoundary>
                        <BrowserRouter>
                            <QueryParamProvider adapter={ReactRouter6Adapter}>
                                <I18nextProvider i18n={i18n}>
                                    <Component />
                                </I18nextProvider>
                            </QueryParamProvider>
                        </BrowserRouter>
                    </ErrorBoundary>
                </StoreContext.Provider>
            </ThemeProvider>,
        );
    }
};

renderApplication(Root);

export { StoreContext };
