import { v4 as uuidv4 } from 'uuid';
import { Task } from '@services/api/__models/todo';
import { makeAutoObservable } from 'mobx';
import { Store } from '@services/store';
import { invokeApi } from '@/utils';

class MainStore {
    tasks: Task[] = [];

    constructor(private root: Store) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.root = root;
    }

    async init() {
        const { api } = this.root;
        await invokeApi(api.todo.getList(), {
            onSuccess: (result) => this.setList(result.data),
        });
    }

    async createTask(title: string) {
        const { api } = this.root;
        await invokeApi(api.todo.createTask({ title }), {
            onSuccess: () => this.addTask(title),
        });
    }

    async deleteTask(id: string) {
        const { api } = this.root;
        await invokeApi(api.todo.deleteTask(id), {
            onSuccess: () => this.setList(this.tasks.filter((i) => i.id !== id)),
        });
    }

    addTask(task: string) {
        const newTask: Task = {
            title: task,
            completed: false,
            id: uuidv4(),
        };
        this.tasks = [newTask, ...this.tasks];
    }

    setList(list: Task[]) {
        this.tasks = list;
    }
}

export default MainStore;
