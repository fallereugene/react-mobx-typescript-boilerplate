import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { enableLogging } from 'mobx-logger';
import { configure } from 'mobx';
import { createServer } from '@services/mocks';
import ErrorBoundary from '@components/error-boundary';
import { Root } from '@containers/root';
import { ThemeProvider } from '@mui/material';
import { Store } from '@services/store';
import { API, setInterceptors } from '@services/api';
import httpService from '@services/http';
import theme from '@/theme';
import './i18n';

const isDevelopmentMode = process.env.ENV !== 'production';

if (isDevelopmentMode) {
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
const store = new Store(new API(httpService));

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
                            <Component />
                        </BrowserRouter>
                    </ErrorBoundary>
                </StoreContext.Provider>
            </ThemeProvider>,
        );
    }
};

isDevelopmentMode && createServer();

renderApplication(Root);
