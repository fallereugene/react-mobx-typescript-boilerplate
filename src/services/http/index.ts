import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpRequestError } from './error';
import { ResponseSuccess, ResponseError } from './contracts';

/**
 * Основное назначение сервиса - осуществление сетевых запросов
 */
export class HttpService {
    private readonly http: AxiosInstance;

    /**
     * Дефолтный таймаут запроса
     */
    private static DEFAULT_TIMEOUT = 10000;

    constructor(httpService: typeof axios) {
        this.http = httpService.create({
            timeout: HttpService.DEFAULT_TIMEOUT,
        });
    }

    /**
     * Получение сервиса (библиотеки) осуществления сетевых запросов.
     */
    get service() {
        return this.http;
    }

    /**
     * Http метод GET
     * @param url Адрес, на который необходимо осуществить запрос
     * @param config Параметры конфигурации
     */
    async get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<ResponseSuccess | ResponseError> {
        return this.http
            .get<T>(url, config)
            .then((r) => HttpService.responseSuccessHandler(r))
            .catch((e) => HttpService.responseErrorHandler(e));
    }

    /**
     * Http метод POST
     * @param url Адрес, на который необходимо осуществить запрос
     * @param config Параметры конфигурации
     */
    async post(url: string, data: any, config: AxiosRequestConfig = {}): Promise<ResponseSuccess | ResponseError> {
        return this.http
            .post(url, data, config)
            .then((response) => HttpService.responseSuccessHandler(response))
            .catch((response) => HttpService.responseErrorHandler(response));
    }

    /**
     * Http метод PUT
     * @param url Адрес, на который необходимо осуществить запрос
     * @param config Параметры конфигурации
     */
    async put(url: string, data: any, config: AxiosRequestConfig = {}): Promise<ResponseSuccess | ResponseError> {
        return this.http
            .put(url, data, config)
            .then((response) => HttpService.responseSuccessHandler(response))
            .catch((response) => HttpService.responseErrorHandler(response));
    }

    /**
     * Http метод PATCH
     * @param url Адрес, на который необходимо осуществить запрос
     * @param config Параметры конфигурации
     */
    async patch(url: string, data: any, config: AxiosRequestConfig = {}): Promise<ResponseSuccess | ResponseError> {
        return this.http
            .patch(url, data, config)
            .then((response) => HttpService.responseSuccessHandler(response))
            .catch((response) => HttpService.responseErrorHandler(response));
    }

    /**
     * Http метод DELETE
     * @param url Адрес, на который необходимо осуществить запрос
     * @param config Параметры конфигурации
     */
    async delete(url: string, config: AxiosRequestConfig = {}): Promise<ResponseSuccess | ResponseError> {
        return this.http
            .delete(url, config)
            .then((response) => HttpService.responseSuccessHandler(response))
            .catch((response) => HttpService.responseErrorHandler(response));
    }

    /**
     * Обработчик успешного ответа
     * @param response Объект данных
     */
    private static responseSuccessHandler(response: AxiosResponse<any>) {
        const { status, data, headers } = response;
        return {
            statusCode: status,
            data,
            headers,
            error: null,
        };
    }

    /**
     * Обработчик ошибки
     * @param error Объект ошибки
     */
    private static responseErrorHandler(error: AxiosError): ResponseError {
        throw new HttpRequestError('Http request error', {
            ...error,
            ...(error.response ? { status: error.response.status, data: null, headers: error.response.headers } : {}),
        });
    }
}

export default new HttpService(axios);
export type { ResponseError, ResponseSuccess };
