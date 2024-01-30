import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { enableLogging } from 'mobx-logger';
import { configure } from 'mobx';
import { createServer } from '@services/mocks';
import ErrorBoundary from '@components/error-boundary';
import { Root } from '@containers/root';
import { ThemeProvider } from '@mui/material';
import { Store } from '@services/store';
import { Api, setInterceptors } from '@services/api';
import httpService from '@services/http';
import { Config } from '@services/config';
import theme from '@/theme';
import './i18n';

const { IS_PRODUCTION_MODE, BASE_API_URL } = Config.getConfig();

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

export const StoreContext = React.createContext<Store>({} as Store);
const store = new Store(new Api(httpService).configure({ baseUrl: BASE_API_URL }));

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
                                <Component />
                            </QueryParamProvider>
                        </BrowserRouter>
                    </ErrorBoundary>
                </StoreContext.Provider>
            </ThemeProvider>,
        );
    }
};

!IS_PRODUCTION_MODE && createServer();

renderApplication(Root);
