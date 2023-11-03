import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '../http';
import { ApiConfig, RequestResult } from './contracts';

export abstract class ModuleAbstract {
    constructor(
        private readonly httpService: HttpService,
        private readonly config: ApiConfig,
    ) {}

    /**
     * Метод GET API клиента
     * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
     * в конфигурации в абстрактном классе API клиента (BaseApi).
     * @returns Результат вызова http сервиса.
     */
    protected async get<TReturn>(url: string): Promise<RequestResult<TReturn>> {
        const xCorrelationID = ModuleAbstract.generateUuid();
        return ModuleAbstract.invoke(
            this.httpService.get(
                ModuleAbstract.sanitizeUrlString(`${this.config.baseUrl}${url}`),
                this.getConfig(xCorrelationID),
            ),
            xCorrelationID,
        );
    }

    /**
     * Метод POST API клиента
     * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
     * в конфигурации в абстрактном классе API клиента (BaseApi).
     * @param data Полезная нагрузка
     * @returns Результат вызова http сервиса.
     */
    protected async post<TReturn = void, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = ModuleAbstract.generateUuid();
        return ModuleAbstract.invoke(
            this.httpService.post(
                ModuleAbstract.sanitizeUrlString(`${this.config.baseUrl}${url}`),
                data,
                this.getConfig(xCorrelationID),
            ),
            xCorrelationID,
        );
    }

    /**
     * Метод PUT API клиента
     * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
     * в конфигурации в абстрактном классе API клиента (BaseApi).
     * @param data Полезная нагрузка
     * @returns Результат вызова http сервиса.
     */
    protected async put<TReturn = void, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = ModuleAbstract.generateUuid();
        return ModuleAbstract.invoke(
            this.httpService.put(
                ModuleAbstract.sanitizeUrlString(`${this.config.baseUrl}${url}`),
                data,
                this.getConfig(xCorrelationID),
            ),
            xCorrelationID,
        );
    }

    /**
     * Метод PATCH API клиента
     * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
     * в конфигурации в абстрактном классе API клиента (BaseApi).
     * @param data Полезная нагрузка
     * @returns Результат вызова http сервиса.
     */
    protected async patch<TReturn = void, TData extends {} = {}>(
        url: string,
        data: TData,
    ): Promise<RequestResult<TReturn>> {
        const xCorrelationID = ModuleAbstract.generateUuid();
        return ModuleAbstract.invoke(
            this.httpService.patch(
                ModuleAbstract.sanitizeUrlString(`${this.config.baseUrl}${url}`),
                data,
                this.getConfig(xCorrelationID),
            ),
            xCorrelationID,
        );
    }

    /**
     * Метод DELETE API клиента
     * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
     * в конфигурации в абстрактном классе API клиента (BaseApi).
     * @returns Результат вызова http сервиса.
     */
    protected async delete<TReturn = void>(url: string): Promise<RequestResult<TReturn>> {
        const xCorrelationID = ModuleAbstract.generateUuid();
        return ModuleAbstract.invoke(
            this.httpService.delete(
                ModuleAbstract.sanitizeUrlString(`${this.config.baseUrl}${url}`),
                this.getConfig(xCorrelationID),
            ),
            xCorrelationID,
        );
    }

    /**
     * Получение конфигурации пере отправкой запроса
     * @param xCorrelationID GUID
     */
    protected getConfig(xCorrelationID: string) {
        return {
            headers: {
                ...this.config.headers,
                'X-Correlation-ID': xCorrelationID,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        };
    }

    /**
     * Основной метод, обрабатывающий результат вызова
     * @param pendingMethod Http метод
     * @param xCorrelationID GUID, отправленный в качестве заголовка
     */
    private static async invoke(pendingMethod: Promise<RequestResult>, xCorrelationID: string) {
        const requestResult = await pendingMethod;
        const { status, headers, error, data } = requestResult;
        return { status, xCorrelationID, headers, data, error };
    }

    /**
     * Санитизация url-строки
     * Удаление лишних слэшей
     * @param string Переданная строка
     */
    private static sanitizeUrlString(string: string): string {
        return string.replace(/([^:])(\/\/+)/g, '$1/');
    }

    /**
     * Генерация UUID v4
     */
    private static generateUuid() {
        return uuidv4();
    }
}
