import { v4 as uuidv4 } from 'uuid';
import { ITask } from '@services/api/contracts';
import { makeAutoObservable } from 'mobx';
import { Store } from '@services/store';
import { invokeApi } from '@/utils';

class MainStore {
    tasks: ITask[] = [];

    root;

    constructor(root: Store) {
        makeAutoObservable(this);
        this.root = root;
    }

    init = async () => {
        const { api } = this.root;
        const { setFetchingState } = this.root.rootStore;
        setFetchingState(true);
        await invokeApi(api.todos.getList(), {
            onSuccess: (result) => {
                result.data && this.setList(result.data);
            },
        });
        setFetchingState(false);
    };

    createTask = async (title: string) => {
        const { api } = this.root;
        const { setFetchingState } = this.root.rootStore;
        setFetchingState(true);
        await invokeApi(api.todos.createTask({ title }), {
            onSuccess: (result) => result.data && this.addTask(title),
        });
        setFetchingState(false);
    };

    deleteTask = async (id: string) => {
        const { api } = this.root;
        const { setFetchingState } = this.root.rootStore;
        setFetchingState(true);
        await invokeApi(api.todos.deleteTask(id), {
            onSuccess: () => this.setList(this.tasks.filter((i) => i.id !== id)),
        });
        setFetchingState(false);
    };

    addTask = (task: string) => {
        const newTask: ITask = {
            title: task,
            completed: false,
            userId: 1,
            id: uuidv4(),
        };
        this.tasks = [newTask, ...this.tasks];
    };

    setList = (list: ITask[]) => {
        this.tasks = list;
    };
}

export default MainStore;
