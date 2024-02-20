import { ApiAbstract } from './abstract-api';
import { TaskModule } from './modules';

export class Api extends ApiAbstract {
    module = {
        task: this.moduleFactory(TaskModule),
    };
}
