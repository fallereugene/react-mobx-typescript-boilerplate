import { RequestResult, RequestResultError, RequestResultSuccess } from '@/services/api/contracts';

export type ActionConfig<
    TResult extends RequestResult<any>,
    TResultData = TResult extends RequestResultSuccess<any>
        ? Omit<RequestResultSuccess<TResult['data']>, 'error'>
        : never,
    TErrorData = TResult extends RequestResultError ? Omit<RequestResultError, 'data'> : never,
> = {
    onSuccess?(requestResultData: TResultData): void;
    onError?(requestErrorData: TErrorData): void;
};

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

const invokeApi = async <
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

export default invokeApi;
