import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../contracts/index.js';

/**
 * Миддлвэр общего назначения
 */
export class CommonMiddleware implements IMiddleware {
    /**
     * Метод, вызываемый при вызове миддлвэра.
     * @param req Объект запроса
     * @param res Объект ответа
     * @param next Передача управления
     */
    async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.info(`-> [${req.method}] ${req.url} ${JSON.stringify(req.body)}`);

        const correlationId = req.headers['x-correlation-id'];
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE')
            .setHeader(
                'Access-Control-Allow-Headers',
                'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Correlation-ID, X-Requested-With',
            )
            .setHeader('X-Requested-With', 'XMLHttpRequest')
            .setHeader('Access-Control-Expose-Headers', '*');
        if (correlationId) {
            res.setHeader('X-Correlation-Id', correlationId);
        }
        next();
    }
}
