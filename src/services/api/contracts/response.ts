import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

export type BaseRequestResult<TStatusCode extends StatusCodes = any> = {
    headers: Record<string, any>;
    statusCode: TStatusCode;
};

export type ResponseSuccess<T = any> = {
    data: T;
    error: null;
} & BaseRequestResult<StatusCodes.OK | StatusCodes.NO_CONTENT>;

export type ResponseError = {
    error: AxiosError;
    data: null;
} & BaseRequestResult;

export type RequestResult<T = any> = ResponseSuccess<T> | ResponseError;
