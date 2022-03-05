import { createServer } from '@services/mocks';
import ErrorBoundary from '@components/error-boundary';
import { Root } from '@containers/root';
import { ThemeProvider } from '@mui/material';
import { Store } from '@services/store';
import { API, setInterceptors } from '@services/api';
import httpService from '@services/http';
import theme from '@/theme';

export const StoreContext = React.createContext<Store>({} as Store);
const store = new Store(new API(httpService));

setInterceptors(httpService, {
    onResponseError: store.rootStore.responseErrorInterceptor,
});

const renderApplication = (Component: React.ElementType) => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <StoreContext.Provider value={store}>
                <ErrorBoundary>
                    <Component />
                </ErrorBoundary>
            </StoreContext.Provider>
        </ThemeProvider>,
        document.getElementById(`root`),
    );
};

process.env.ENV !== 'production' ? createServer(() => renderApplication(Root)) : renderApplication(Root);
module.hot && module.hot.accept && module.hot.accept();
