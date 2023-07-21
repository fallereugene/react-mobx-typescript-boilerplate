import axios, { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';
import { Store } from '@services/store';
import { RootState } from './constants';

class RootStore {
    state: RootState = RootState.Initialization;

    requestErrors: string[] = [];

    isFetching = true;

    constructor(private root: Store) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setState(state: RootState) {
        this.state = state;
    }

    removeRequestError(error: string) {
        this.requestErrors = this.requestErrors.filter((i) => i !== error);
    }

    setFetchingState(isFetching: boolean) {
        this.isFetching = isFetching;
    }

    setRequestError(error: string) {
        this.requestErrors = [...this.requestErrors, error];
    }

    responseErrorInterceptor(error: AxiosError) {
        // eslint-disable-next-line
        console.log(`axError:`, axios.isAxiosError(error));

        if (axios.isAxiosError(error)) {
            const headers = error?.response?.headers || {};
            // eslint-disable-next-line
            console.log(`Error:`, JSON.stringify(error?.response));

            let xCorrelationId: string | null = null;
            // eslint-disable-next-line
            for (const [key, value] of Object.entries(headers)) {
                if (key.toLowerCase() === 'x-correlation-id') {
                    xCorrelationId = value as string;
                    break;
                }
            }

            xCorrelationId && this.setRequestError(xCorrelationId);
        }
    }

    async init() {
        this.setState(RootState.Initialized);
    }
}

export default RootStore;
