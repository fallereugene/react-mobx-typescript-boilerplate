import React from 'react';
import { FetchingState } from '@containers/root/constants';

/**
 * Хук вызова API.
 * Основное назначение - разделить вызовы и состояния вызовов для более удобного управления
 * приложением.
 * @param callback исполняемый коллбэк
 * @returns Метод возвращает текущее состояние вызова и функцию, которая осуществляет вызов
 * переданного коллбэка
 */
export const useFetch = <T extends (...args: any[]) => any>(callback: T): [FetchingState, T, typeof FetchingState] => {
    const [fetchingState, setFetchingState] = React.useState<FetchingState>(FetchingState.Idle);

    // eslint-disable-next-line
    const invokeCallback = React.useCallback(
        (async (...args: any[]) => {
            setFetchingState(FetchingState.Idle);
            setFetchingState(FetchingState.Fetching);

            await callback(...args, {
                onSuccess: () => setFetchingState(FetchingState.Success),
                onError: () => setFetchingState(FetchingState.Error),
            });
        }) as T,
        [],
    );

    return [fetchingState, invokeCallback, FetchingState];
};
