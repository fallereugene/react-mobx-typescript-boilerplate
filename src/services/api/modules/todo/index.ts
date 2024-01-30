import { ModuleAbstract } from '../../abstract-module';
import { Task } from '../../__models/todo';

export class Todo extends ModuleAbstract {
    async getList() {
        return super.get<Task[]>(`/todos`);
    }

    async createTask(data: Partial<Task>) {
        return super.post<Task>(`/todos`, data);
    }

    async deleteTask(id: string | number) {
        return super.delete(`/todos/${id}`);
    }
}
