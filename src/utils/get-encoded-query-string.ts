import queryString from 'query-string';
import { QueryParamConfigMap, encodeQueryParams } from 'use-query-params';

/**
 * Преобразование объекта в кодированную строку запроса
 * @param configuration Конфигурация query-параметров
 * @param object Преобразуемый в строку объект
 * @returns Нормализованная кодированная строка запроса
 */
export const getEncodedQueryString = (configuration: QueryParamConfigMap, object: Record<string, any>): string => {
    return `/?${queryString.stringify(encodeQueryParams(configuration, object))}`;
};
