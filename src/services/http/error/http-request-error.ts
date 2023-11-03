/**
 * Общая ошибка сервиса Http
 */
export class HttpRequestError extends Error {
    constructor(
        message: string,
        readonly meta: object,
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}
