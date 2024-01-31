import { Schema } from './index.js';

export interface IConfig {
    get<T extends keyof Schema>(key: T): Schema[T];
    getFullSchema(): Schema;
}
