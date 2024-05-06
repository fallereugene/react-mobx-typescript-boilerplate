import RootStore from '@containers/root/store';
import { Api } from '@services/api';
import { Logger } from '@services/logger';
import { EventBus } from '@services/event-bus';
import { AvailableEvent } from '@/contracts';

export class Store {
    rootStore = new RootStore(this);

    constructor(public api: Api, public eventBus: EventBus<AvailableEvent>, public logger: Logger) {}
}
