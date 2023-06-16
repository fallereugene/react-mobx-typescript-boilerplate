import { ITask } from '../contracts';
import BaseModule from './base-module';

export default class Todos extends BaseModule {
    async getList() {
        return super.get<ITask[]>(`/todos`);
    }

    async createTask(data: Partial<ITask>) {
        return super.post(`/todos`, data);
    }

    async deleteTask(id: string | number) {
        return super.delete(`/todos/${id}`);
    }
}
