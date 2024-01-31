import { Store } from './store.js';

export interface IStoreService {
    data: Store;
    updateStore(store: Store): void;
}
