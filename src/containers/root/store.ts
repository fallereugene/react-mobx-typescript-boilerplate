import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from 'mobx';
import { Store } from '@services/store';
import { Notification } from './contracts';
import { RootState } from './constants';

class RootStore {
    state: RootState = RootState.Initialization;

    notifications: Notification[] = [];

    constructor(private root: Store) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setState(state: RootState) {
        this.state = state;
    }

    addNotification(payload: Notification) {
        this.notifications = [...this.notifications, payload];
    }

    removeNotification(payload: Notification) {
        this.notifications = this.notifications.filter((i) => i !== payload);
    }

    responseErrorInterceptor(error: AxiosError) {
        if (axios.isAxiosError(error)) {
            const headers = error?.response?.headers || {};
            const xCorrelationId = error.code === 'ECONNABORTED' ? error?.config?.headers?.['X-Correlation-ID'] : null;
            const header =
                error.code === 'ECONNABORTED'
                    ? 'Истекло время ожидания ответа. Повторите попытку позже.'
                    : 'Произошла ошибка';
            this.addNotification({
                header: header || 'Ошибка запроса.',
                text:
                    xCorrelationId ??
                    (() => {
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(headers)) {
                            if (key.toLowerCase() === 'x-correlation-id') {
                                return value;
                            }
                        }
                        return 'Что-то пошло не так';
                    })(),
                severity: 'error',
                type: 'toast',
                id: uuidv4(),
            });
        }
    }

    async init() {
        this.setState(RootState.Initialized);
    }
}

export default RootStore;
