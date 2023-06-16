import { AxiosError } from 'axios';

type ErrorResponse = {
    statusCode: number;
    headers: Partial<Record<string, string>>;
    error: AxiosError;
    data: null;
};

export default ErrorResponse;
