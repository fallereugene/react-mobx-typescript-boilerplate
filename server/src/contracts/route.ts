import { Request, Response, NextFunction } from 'express';
import { HttpMethod } from '../constants/index.js';
import { IMiddleware } from '../contracts/index.js';

export interface IRoute {
    path: string;
    method: HttpMethod;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    middlewares?: IMiddleware[];
}
