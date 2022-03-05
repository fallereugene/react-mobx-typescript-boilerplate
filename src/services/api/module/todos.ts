import { RequestResult, ITask } from '../contracts';
import BaseModule from './base-module';

export default class Todos extends BaseModule {
    async getList(): Promise<RequestResult<ITask[]>> {
        return super.get(`/todos`);
    }

    async createTask(data: Partial<ITask>): Promise<RequestResult<void>> {
        return super.post(`/todos`, data);
    }

    async deleteTask(id: string | number): Promise<RequestResult<void>> {
        return super.delete(`/todos/${id}`);
    }
}
