import RootStore from '@containers/root/store';
import MainStore from '@routes/main/store';
import { API } from '@services/api';

export class Store {
    rootStore = new RootStore(this);

    mainStore = new MainStore(this);

    constructor(public api: API) {}
}
