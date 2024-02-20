import { injectable } from 'inversify';
import { IStoreService, Store } from './contracts/index.js';
import { tasks } from './models/index.js';

@injectable()
export class StoreService implements IStoreService {
    private store: Store = {
        tasks,
    };

    get data() {
        return this.store;
    }

    updateStore(fullStore: Store) {
        this.store = fullStore;
    }
}
