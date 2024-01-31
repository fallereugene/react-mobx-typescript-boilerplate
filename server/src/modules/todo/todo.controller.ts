import { inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ContainerIoC } from '../../constants/index.js';
import { ILogger } from '../../services/logger/contracts/index.js';
import { ControllerBase } from '../../services/controller/index.js';
import { IConfig } from '../../services/config/contracts/index.js';
import { IStoreService } from '../../services/store/contracts/index.js';
import { HttpMethod } from '../../constants/index.js';
import { Todo } from '../../services/store/models/index.js';
// import { HttpError } from '../../services/error/http-error.js';

export class TodoController extends ControllerBase {
    constructor(
        @inject(ContainerIoC.LoggerService) logger: ILogger,
        @inject(ContainerIoC.ConfigService) configService: IConfig,
        @inject(ContainerIoC.StoreService) storeService: IStoreService,
    ) {
        super(logger, configService, storeService);

        this.logger.info('Register route for TodoController');

        this.registerRoute({
            path: '/',
            method: HttpMethod.Get,
            handler: this.getList,
        });

        this.registerRoute({
            path: '/',
            method: HttpMethod.Post,
            handler: this.addItem,
        });

        this.registerRoute({
            path: '/:id',
            method: HttpMethod.Delete,
            handler: this.deleteItem,
        });
    }

    /**
     * Получение списка задач
     * @param _req
     * @param res
     */
    async getList(_req: Request, res: Response) {
        this.send(res, StatusCodes.OK, this.storeService.data.todos);
    }

    /**
     * Добавление задачи в список
     * @param req Объект запроса
     * @param res Объект ответа
     */
    async addItem(req: Request<Record<string, unknown>, Record<string, unknown>, { title: string }>, res: Response) {
        // throw new HttpError(StatusCodes.BAD_REQUEST, 'Connection to database timed out', 'WalletController');
        // await new Promise((res) => setTimeout(res, 5000));
        const { title } = req.body;
        const record: Todo = {
            title,
            id: uuidv4(),
            completed: false,
        };
        this.storeService.updateStore({
            ...this.storeService.data,
            todos: [...this.storeService.data.todos, record],
        });
        this.created(res, record);
    }

    /**
     * Удаление задачи их списка
     * @param req Объект запроса
     * @param res Объект ответа
     */
    async deleteItem(req: Request, res: Response) {
        this.storeService.updateStore({
            ...this.storeService.data,
            todos: this.storeService.data.todos.filter((item) => item.id !== req.params.id),
        });
        this.noContent(res);
    }
}
