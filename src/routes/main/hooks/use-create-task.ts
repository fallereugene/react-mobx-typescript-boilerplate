import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@services/react-query-client';
import { Task } from '@services/api/__models/todo';
import { api } from '@services/api';
import { QUERY_KEY } from '../constants';

/**
 * Создание задачи
 */
export const useCreateTask = () => {
    const { data, variables, ...rest } = useMutation({
        mutationFn: (title: string) => api.todo.createTask({ title }),
        onSuccess: () => {
            queryClient.setQueryData<Task[]>([QUERY_KEY.tasks], (tasks) => {
                const newTask = {
                    title: variables ?? '',
                    completed: false,
                    id: uuidv4(),
                };
                return tasks ? [newTask, ...tasks] : [];
            });
        },
    });

    return {
        ...rest,
    };
};
