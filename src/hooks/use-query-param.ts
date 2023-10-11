import { useQueryParams, QueryParamConfigMap } from 'use-query-params';

export type QueryParams<T extends QueryParamConfigMap> = {
    // объект query-параметров
    params: T;
    // добавить параметры
    add(newParamsObject: Partial<ReturnType<typeof useQueryParams<T>>[0]>): void;
    // удалить часть имеющихся параметров
    remove(paramNames: (keyof T)[]): void;
    // заменить имеющиеся параметры
    replace(newParamsObject: Partial<ReturnType<typeof useQueryParams<T>>[0]>): void;
    // удалить все query-параметры
    clear(): void;
};

/**
 * Хук для работы с query-параметрами
 * @param config Конфигурация query-параметров
 * {@link https://github.com/pbeshai/use-query-params/tree/master/packages/use-query-params#readme|Подробнее}
 * @example
 * Использование в компонентах:
 *
 *  export const QUERY_PARAMETERS_CONFIGURATION = {
 *      value: StringParam,
 *      phone: StringParam,
 *  };
 *
 *  const { params, add, remove, replace } =
 *      useQueryParams<typeof QUERY_PARAMETERS_CONFIGURATION>(QUERY_PARAMETERS_CONFIGURATION);
 */
export const useQueryParam = <T extends QueryParamConfigMap>(config: QueryParamConfigMap): QueryParams<T> => {
    const [params, setQuery] = useQueryParams(config);

    const add: QueryParams<T>['add'] = (newParamsObject) => setQuery({ ...params, ...newParamsObject }, 'push');
    const remove: QueryParams<T>['remove'] = (names) => names.forEach((name) => setQuery({ [name]: undefined }));
    const replace: QueryParams<T>['replace'] = (newParamsObject) => setQuery(newParamsObject, 'replace');
    const clear: QueryParams<T>['clear'] = () =>
        Object.keys(params).forEach((paramName) => setQuery({ [paramName]: undefined }));

    return {
        params: params as QueryParams<T>['params'],
        add,
        remove,
        replace,
        clear,
    };
};
