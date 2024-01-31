import RootStore from '@containers/root/store';
import { Api } from '@services/api';

export class Store {
    rootStore = new RootStore(this);

    constructor(public api: Api) {}
}
