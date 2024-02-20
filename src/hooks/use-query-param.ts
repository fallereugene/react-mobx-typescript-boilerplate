import {
    useQueryParams as useQueryParamsLib,
    QueryParamConfigMap,
    DecodedValueMap,
    NumberParam,
    StringParam,
    BooleanParam,
    ArrayParam,
} from 'use-query-params';

export type QueryParams<T extends QueryParamConfigMap> = {
    // объект query-параметров
    params: DecodedValueMap<T>;
    // добавить параметры
    add(newParamsObject: Partial<DecodedValueMap<T>>): void;
    // удалить часть имеющихся параметров
    remove(paramNames: (keyof T)[]): void;
    // заменить имеющиеся параметры
    replace(newParamsObject: Partial<DecodedValueMap<T>>): void;
    // удалить все query-параметры
    clear(): void;
};

/**
 * Хук для работы с query-параметрами
 *
 * @param config Конфигурация query-параметров
 * {@link https://github.com/pbeshai/use-query-params/tree/master/packages/use-query-params#readme|Подробнее}
 * @example
 * const { params, add, remove, replace } = useQueryParams({
 *   value: useQueryParams.types.StringParam,
 *   phone: useQueryParams.types.StringParam,
 * });
 */
export const useQueryParams = <T extends QueryParamConfigMap>(config: T): QueryParams<T> => {
    const [params, setQuery] = useQueryParamsLib(config);

    const add: QueryParams<T>['add'] = (newParamsObject) => setQuery({ ...params, ...newParamsObject }, 'push');
    const remove: QueryParams<T>['remove'] = (names) =>
        names.forEach((name) => setQuery({ [name]: undefined } as Partial<DecodedValueMap<T>>));
    const replace: QueryParams<T>['replace'] = (newParamsObject) => setQuery(newParamsObject, 'replace');
    const clear: QueryParams<T>['clear'] = () => setQuery({}, 'replace');

    return {
        params,
        add,
        remove,
        replace,
        clear,
    };
};

// Поддерживаемые типы для конфига useQueryParams
useQueryParams.types = {
    StringParam,
    NumberParam,
    BooleanParam,
    ArrayParam,
};
