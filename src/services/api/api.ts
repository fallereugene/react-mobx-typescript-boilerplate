import { Todos } from './module';
import BaseAPI from './base-api';

export class API extends BaseAPI {
    todos = this.instantiateModule(Todos);
}
