import { AxiosError, AxiosHeaders } from 'axios';

export type ResponseError = {
    error: AxiosError;
    data: null;
    headers: AxiosHeaders['headers'];
    status: number;
};
