import { AxiosHeaders } from 'axios';

export type ResponseSuccess = {
    statusCode: number;
    data: any;
    headers: AxiosHeaders['headers'];
    error: null;
};
