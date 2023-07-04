import BaseModule from './base-module';
import { Task } from '../__models/todo';

export default class Todos extends BaseModule {
    async getList() {
        return super.get<Task[]>(`/todos`);
    }

    async createTask(data: Partial<Task>) {
        return super.post(`/todos`, data);
    }

    async deleteTask(id: string | number) {
        return super.delete(`/todos/${id}`);
    }
}
