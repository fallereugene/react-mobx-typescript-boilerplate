import React from 'react';
import { FetchingState } from '@containers/root/constants';

/**
 * Хук для использования API приложения
 *
 * @param callback исполняемый коллбэк
 * @returns Метод возвращает текущее состояние вызова, функцию, которая осуществляет вызов
 * переданного коллбэка, полученные данные и функцию сброса
 *
 * NOTE: в данный момент хук предусматривает то, что данные хранятся в самом хуке и результат
 * вызова не возвращается. В дальнейшем при необходимости можно возвращать данные и
 * использовать результат "на месте"
 */
export const useApi = <T extends (...args: any[]) => any, K extends Awaited<ReturnType<T>>['data']>(
    callback: T,
): [FetchingState, T, typeof FetchingState, K | null, () => void] => {
    const [fetchingState, setFetchingState] = React.useState<FetchingState>(FetchingState.Idle);
    const [dataSource, setSource] = React.useState<K | null>(null);
    const reset = () => {
        setFetchingState(FetchingState.Idle);
        setSource(null);
    };

    // eslint-disable-next-line
    const invokeCallback = React.useCallback(
        (async (...args: any[]) => {
            setFetchingState(FetchingState.Idle);
            setFetchingState(FetchingState.Fetching);
            const result = await callback(...args);
            if (result.error) {
                setFetchingState(FetchingState.Error);
                return;
            }
            setFetchingState(FetchingState.Success);
            setSource(result.data);
        }) as T,
        [],
    );

    return [fetchingState, invokeCallback, FetchingState, dataSource, reset];
};
