import React from 'react';
import { Api } from '@services/api';
import { RequestResult } from '@/services/api/contracts';
import { FetchingState } from '@/constants';
import { useStore } from './use-store';

type HookResult<TApiModuleMethod, TRequestResult, TApiModuleMethodName extends string | number | symbol> = {
    // состояние запроса
    fetchingState: FetchingState;
    // статус ответа
    statusCode: number | null;
    // данные ответа при успешном выполнении
    resultData: TRequestResult | null;
    // заголовки ответа
    resultHeaders: Record<string, string> | null;
    // доступные состояния запроса
    fetchStates: typeof FetchingState;
    // сброс данных запроса
    reset: () => void;
} & {
    // функция вызова запроса
    [key in TApiModuleMethodName]: TApiModuleMethod;
};

type ApiMethodReturnType<
    TApiModule extends Api['module'],
    TApiModuleName extends keyof TApiModule,
    TApiModuleMethodName extends keyof TApiModule[TApiModuleName],
    T extends TApiModule[TApiModuleName][TApiModuleMethodName],
> = T extends (...args: any) => infer R ? R : any;

/**
 * Хук для использования API приложения
 * Пример использования:
 * const {
 *     getParticipant,
 * } = useApi('client', 'getParticipant');
 * <Button onClick={() => getParticipant('id'))}>Send request</Button>
 *
 * @param apiModuleName - название модуля api
 * @param moduleMethod - название метода модуля api
 */
export const useApi = <
    TApiModules extends Api['module'],
    TApiModuleName extends keyof TApiModules,
    TApiModuleMethodName extends keyof TApiModules[TApiModuleName],
    TApiModuleMethod extends TApiModules[TApiModuleName][TApiModuleMethodName],
    K extends Awaited<ApiMethodReturnType<TApiModules, TApiModuleName, TApiModuleMethodName, TApiModuleMethod>>,
    TRequestResult = K extends { data: any } ? K['data'] : never,
>(
    moduleName: TApiModuleName,
    moduleMethodName: TApiModuleMethodName,
): HookResult<TApiModuleMethod, TRequestResult, TApiModuleMethodName> => {
    const { api } = useStore();

    const [fetchingState, setFetchingState] = React.useState<FetchingState>(FetchingState.Idle);
    const [resultData, setResultData] = React.useState<K | null>(null);
    const [statusCode, setStatusCode] = React.useState<number | null>(null);
    const [resultHeaders, setResultHeaders] = React.useState<Record<string, string> | null>(null);
    const reset = () => {
        setFetchingState(FetchingState.Idle);
        setResultData(null);
        setStatusCode(null);
        setResultHeaders(null);
    };

    const invokeRequest = React.useCallback(
        async (...args: any[]) => {
            setFetchingState(FetchingState.Idle);
            setFetchingState(FetchingState.Fetching);

            const apiModule = api.module[moduleName as keyof Api['module']];
            const apiMethod: (...args: any) => any = apiModule[moduleMethodName as keyof typeof apiModule];
            const boundApiMethod = apiMethod.bind(apiModule);

            const result: RequestResult<K> = await boundApiMethod(...args);

            setStatusCode(result.statusCode);
            setResultHeaders(result.headers);

            if (result.error) {
                setFetchingState(FetchingState.Error);
                return;
            }

            setFetchingState(FetchingState.Success);
            setResultData(result.data);
        },
        [api.module, moduleName, moduleMethodName],
    );

    return {
        fetchingState,
        statusCode,
        resultData,
        resultHeaders,
        fetchStates: FetchingState,
        [moduleMethodName]: invokeRequest,
        reset,
    } as HookResult<TApiModuleMethod, TRequestResult, TApiModuleMethodName>;
};
