import { injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Router, Response } from 'express';
import { IController } from './contracts/index.js';
import { ILogger } from '../logger/contracts/index.js';
import { IRoute } from '../../contracts/index.js';
import { IConfig } from '../config/contracts/index.js';
import { IStoreService } from '../store/contracts/index.js';

@injectable()
export abstract class ControllerBase implements IController {
    private readonly expressRouter: Router;

    constructor(protected logger: ILogger, protected configService: IConfig, protected storeService: IStoreService) {
        this.expressRouter = Router();
    }

    get router() {
        return this.expressRouter;
    }

    /**
     * Регистрация роута
     * @param route Переданный объект роута
     */
    registerRoute(route: IRoute) {
        const { path, method, handler, middlewares } = route;
        this.logger.info(`Register route. Path: ${path}, method: ${method.toUpperCase()}.`);
        this.expressRouter[method](
            path,
            middlewares?.map((middleware) => asyncHandler(middleware.execute.bind(middleware))) ?? [],
            asyncHandler(handler.bind(this)),
        );
    }

    /**
     * Отправка ответа на запрос
     * @param res Объект ответа
     * @param statusCode Статус-код ответа
     * @param data Полезная нагрузка
     */
    send<T>(res: Response, statusCode: StatusCodes, data: T): void {
        res.type('application/json').status(statusCode).json(data);
    }

    /**
     * Хэлпер (обертка) над методом send, вызываемый в случае
     * создания сущности
     * @param res Объект ответа
     * @param data Полезная нагрузка
     */
    created<T>(res: Response, data: T): void {
        this.send(res, StatusCodes.CREATED, data);
    }

    /**
     * Обертка над методом send, вызываемая в случае, если отсутствует контент
     * @param res Объект ответа
     * @param data Полезная нагрузка
     */
    noContent<T>(res: Response, data?: T): void {
        this.send(res, StatusCodes.NO_CONTENT, data ?? {});
    }
}
