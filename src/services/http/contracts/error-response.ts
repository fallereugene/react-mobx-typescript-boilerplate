import { AxiosError } from 'axios';

type ErrorResponse = {
    statusCode: number;
    headers: Record<string, any>;
    error: AxiosError;
    data: null;
};

export default ErrorResponse;
