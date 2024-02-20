import { ApiConfig } from './contracts';
import { HttpService } from '../http';

export abstract class ApiAbstract {
    private config: ApiConfig = {
        baseUrl: '',
        headers: {},
    };

    constructor(protected http: HttpService) {}

    configure(config: Partial<ApiConfig>) {
        Object.assign(this.config, config);
        return this;
    }

    protected moduleFactory<T>(Module: new (...args: any[]) => T) {
        return new Module(this.http, this.config);
    }
}
