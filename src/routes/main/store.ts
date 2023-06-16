import { v4 as uuidv4 } from 'uuid';
import { ITask } from '@services/api/contracts';
import { makeAutoObservable } from 'mobx';
import { Store } from '@services/store';
import { invokeApi } from '@/utils';

class MainStore {
    tasks: ITask[] = [];

    constructor(private root: Store) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.root = root;
    }

    async init() {
        const { api } = this.root;
        await invokeApi(api.todos.getList(), {
            onSuccess: (result) => this.setList(result.data),
        });
    }

    async createTask(title: string) {
        const { api } = this.root;
        await invokeApi(api.todos.createTask({ title }), {
            onSuccess: () => this.addTask(title),
        });
    }

    async deleteTask(id: string) {
        const { api } = this.root;
        await invokeApi(api.todos.deleteTask(id), {
            onSuccess: () => this.setList(this.tasks.filter((i) => i.id !== id)),
        });
    }

    addTask(task: string) {
        const newTask: ITask = {
            title: task,
            completed: false,
            userId: 1,
            id: uuidv4(),
        };
        this.tasks = [newTask, ...this.tasks];
    }

    setList(list: ITask[]) {
        this.tasks = list;
    }
}

export default MainStore;
