import { makeAutoObservable } from 'mobx';
import RootStore from '@containers/root/store';
import MainStore from '@routes/main/store';
import { API } from '@services/api';

export class Store {
    rootStore: RootStore;

    mainStore: MainStore;

    constructor(public api: API) {
        this.rootStore = new RootStore(this);
        this.mainStore = new MainStore(this);
        makeAutoObservable(this);
    }
}
