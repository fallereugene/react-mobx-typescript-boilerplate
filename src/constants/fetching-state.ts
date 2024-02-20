/**
 * Состояние вызова методов API
 */
export enum FetchingState {
    // запрос не производился
    Idle = 'Idle',
    // происходит запрос
    Fetching = 'Fetching',
    // запрос завершился ошибкой
    Error = 'Error',
    // запрос успешно завершен
    Success = 'Success',
}
