import { AxiosHeaders } from 'axios';

export type ResponseSuccess = {
    data: any;
    error: null;
    headers: AxiosHeaders['headers'];
    status: number;
};
