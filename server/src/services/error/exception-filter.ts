import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { IExceptionFilter } from './contracts/index.js';
import { ILogger } from '../logger/contracts/index.js';
import { ContainerIoC } from '../../constants/index.js';
import { Error as ErrorType } from './constants/index.js';
import { HttpError } from './index.js';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
    private static createErrorObject(type: ErrorType, message: string) {
        return {
            type,
            message,
        };
    }

    constructor(@inject(ContainerIoC.LoggerService) private logger: ILogger) {
        this.logger.info('Register ExceptionFilter');
    }

    /**
     * Перехват и обработка возникающих ошибок приложения
     * @param error Объект ошибки
     * @param req Объект запрос
     * @param res Объект ответа
     * @param next Аргумент обратного вызова для функции промежуточного обработчика
     */
    catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
        switch (error.constructor) {
            case HttpError:
                this.handleHttpError(error as HttpError, req, res, next);
                break;
            default:
                this.handleOtherError(error, req, res, next);
                break;
        }
    }

    /**
     * Обработка сетевых ошибок
     * @param error Объект ошибок
     * @param _req Объект запроса
     * @param res Объект ответа
     * @param _next Переход к следующему обработчку
     */
    private handleHttpError(
        error: HttpError,
        _req: Request,
        res: Response,
        // eslint-disable-next-line
        _next: NextFunction,
    ) {
        const { message } = error;
        this.logger.error(`[${error.details}]: ${error.httpStatusCode} — ${error.message}`);
        res.status(error.httpStatusCode).json(ExceptionFilter.createErrorObject(ErrorType.CommonError, message));
    }

    /**
     * Обработка остальных ошибок, которые не входят в список известных
     * @param error Объект ошибки
     * @param _req Объект запроса
     * @param res Объект ответа
     * @param _next Переход к следующему обработчку
     */
    private handleOtherError(
        error: Error,
        _req: Request,
        res: Response,
        // eslint-disable-next-line
        _next: NextFunction,
    ) {
        const { message } = error;
        this.logger.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            ExceptionFilter.createErrorObject(ErrorType.ServiceError, message),
        );
    }
}
