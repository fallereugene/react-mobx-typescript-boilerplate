import { AxiosError } from 'axios';
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
        const xCorrelationId = error.response?.request.requestHeaders['X-Correlation-ID'];
        if (xCorrelationId) {
            this.requestErrors = [...this.requestErrors, xCorrelationId];
        }
    }
}

export default RootStore;
