import httpService from '@services/http';
import { Config } from '@services/config';
import { ApiAbstract } from './abstract-api';
import { Todo } from './modules';

const { BASE_API_URL } = Config.getConfig();

export class Api extends ApiAbstract {
    module = {
        todo: this.moduleFactory(Todo),
    };
}

export const api = new Api(httpService).configure({ baseUrl: BASE_API_URL });
