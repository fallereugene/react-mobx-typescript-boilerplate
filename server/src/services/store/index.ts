import { injectable } from 'inversify';
import { IStoreService, Store } from './contracts/index.js';
import { todos } from './models/index.js';

@injectable()
export class StoreService implements IStoreService {
    private store: Store = {
        todos,
    };

    get data() {
        return this.store;
    }

    updateStore(fullStore: Store) {
        this.store = fullStore;
        this.store.todos.filter((item) => item);
    }
}
