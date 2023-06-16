import { useSearchParams } from 'react-router-dom';

type QueryParamsObject = { [key: string]: string };

export type QueryParamsData<T extends QueryParamsObject> = {
    // объект query-параметров
    params: T;
    // добавить query-параметры к уже имеющимся
    add(newParamsObject: T): void;
    // удалить query-параметр из уже имеющихся
    remove(paramName: keyof T): void;
    // перезаписать уже имеющиеся query-параметры
    replace(newParamsObject: T): void;
    // очистить все query-параметры
    clear(): void;
};

/**
 * Хук для работы с query-параметрами адресной строки
 */
export const useQueryParams = <T extends QueryParamsObject>(): QueryParamsData<T> => {
    const [search, setSearch] = useSearchParams();
    const queryParamsObject: any = Object.fromEntries(search);
    const add = (newParamsObject: T) => setSearch({ ...queryParamsObject, ...newParamsObject });
    const remove = (paramName: keyof T) => {
        delete queryParamsObject[paramName];
        setSearch(queryParamsObject);
    };
    const replace = (newParamsObject: T) => setSearch(newParamsObject);
    const clear = () => {
        setSearch({});
        Object.keys(queryParamsObject).forEach((key) => delete queryParamsObject[key]);
    };

    return {
        params: queryParamsObject,
        add,
        remove,
        replace,
        clear,
    };
};
