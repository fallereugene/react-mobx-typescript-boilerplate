import { RequestResult, ResponseError, ResponseSuccess } from '@/services/api/contracts';

export type ActionConfig<
    TResult extends RequestResult<any>,
    TResultData = TResult extends ResponseSuccess<any> ? Omit<ResponseSuccess<TResult['data']>, 'error'> : never,
    TErrorData = TResult extends ResponseError ? Omit<ResponseError, 'data'> : never,
> = {
    onSuccess?(requestResultData: TResultData): void;
    onError?(requestErrorData: TErrorData): void;
};

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export const invokeApi = async <
    TData,
    TApiMethod extends Promise<RequestResult<TData>>,
    TResult extends UnboxPromise<TApiMethod>,
>(
    invokedApiMethod: TApiMethod,
    config?: ActionConfig<TResult>,
) => {
    const result = await invokedApiMethod;

    if (config) {
        const { onError, onSuccess } = config;

        if (result.error) {
            onError && onError(result as any);
        } else {
            onSuccess && onSuccess(result as any);
        }
    }
};
