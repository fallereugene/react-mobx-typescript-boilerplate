import { ModuleAbstract } from '../../abstract-module';
import { Task } from '../../__models/task';

export class TaskModule extends ModuleAbstract {
    async getList() {
        return super.get<Task[]>(`/tasks`);
    }

    async createTask(data: Partial<Task>) {
        return super.post<Task>(`/tasks`, data);
    }

    async deleteTask(id: string | number) {
        return super.delete(`/tasks/${id}`);
    }

    async changeTask(id: string, payload: Task) {
        return super.patch<Task>(`/tasks/${id}`, payload);
    }
}
