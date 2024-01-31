import { AxiosError, AxiosHeaders } from 'axios';

export type ResponseError = {
    statusCode: number;
    headers: AxiosHeaders['headers'];
    error: AxiosError;
    data: null;
};
