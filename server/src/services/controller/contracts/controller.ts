import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRoute } from '../../../contracts/index.js';

export interface IController {
    router: Router;
    registerRoute(route: IRoute): void;
    send<T>(res: Response, statusCode: StatusCodes, data: T): void;
}
