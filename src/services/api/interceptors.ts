import { AxiosError } from 'axios';
import httpService from '../http';

interface IConfig {
    onResponseError?(error: AxiosError): void;
}

const setInterceptors = (http: typeof httpService, config: IConfig) => {
    const { service } = http;
    const { onResponseError } = config;
    service.interceptors.response.use(
        (config) => config,
        (error) => {
            onResponseError && onResponseError(error);
            return Promise.reject(error);
        },
    );
};

export default setInterceptors;
