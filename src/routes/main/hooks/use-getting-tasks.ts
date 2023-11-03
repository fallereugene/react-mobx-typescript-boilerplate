import { useQuery } from '@tanstack/react-query';
import { api } from '@services/api';
import { QUERY_KEY } from '../constants';

/**
 * Получение списка заданий
 */
export const useGettingTasks = () => {
    return useQuery({
        queryKey: [QUERY_KEY.tasks],
        queryFn: () => api.todo.getList().then((r) => r.data),
    });
};
