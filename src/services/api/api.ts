import { ApiAbstract } from './abstract-api';
import { Todo } from './modules';

export class Api extends ApiAbstract {
    todo = this.moduleFactory(Todo);
}
