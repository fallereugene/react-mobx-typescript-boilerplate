import { useMutation } from '@tanstack/react-query';
import queryClient from '@services/react-query-client';
import { Task } from '@services/api/__models/todo';
import { api } from '@services/api';
import { QUERY_KEY } from '../constants';

/**
 * Удаление задачи по идентификатору
 */
export const useDeleteTask = () => {
    const { variables, ...rest } = useMutation({
        mutationFn: (taskId: string) => api.todo.deleteTask(taskId),
        onSuccess: () => {
            queryClient.setQueryData<Task[]>(
                [QUERY_KEY.tasks],
                (tasks) => tasks?.filter((item) => item.id !== variables),
            );
        },
    });

    return {
        ...rest,
    };
};
