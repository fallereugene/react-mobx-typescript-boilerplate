import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import httpService from '../http';

interface IConfig {
    onResponseError?(error: AxiosError): void;
}

export const setInterceptors = (http: typeof httpService, config: IConfig) => {
    const { service } = http;
    const { onResponseError } = config;
    service.interceptors.response.use(
        (config) => config,
        (error) => {
            const headers = error?.response?.headers || {};
            switch (error?.response?.status) {
                case StatusCodes.GATEWAY_TIMEOUT:
                    break;
                case StatusCodes.UNAUTHORIZED:
                    if (headers && headers.location) {
                        window.location.href = headers.location;
                    }
                    return Promise.reject(error);
                default:
                    onResponseError && onResponseError(error);
            }
            return Promise.reject(error);
        },
    );
};
