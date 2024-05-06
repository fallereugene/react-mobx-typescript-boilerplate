import { inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ContainerIoC } from '../../constants/index.js';
import { ILogger } from '../../services/logger/contracts/index.js';
import { ControllerBase } from '../../services/controller/index.js';
import { IConfig } from '../../services/config/contracts/index.js';
import { IStoreService } from '../../services/store/contracts/index.js';
import { IWebSocketService } from '../../services/web-socket/contracts/index.js';
import { HttpMethod } from '../../constants/index.js';
import { Task } from '../../__models/task/index.js';

/**
 * Контроллер
 * @example
 * Для работы с исключениями необходимо импортировать необходимый класс ошибки из /services/error/.
 * И далее там, где необходимо, использовать в соответствии с сигнатурой.
 * Например, throw new HttpError(StatusCodes.BAD_REQUEST, 'Некорректный запрос', 'Todo Controller');
 */
export class TaskController extends ControllerBase {
    constructor(
        @inject(ContainerIoC.LoggerService) logger: ILogger,
        @inject(ContainerIoC.ConfigService) configService: IConfig,
        @inject(ContainerIoC.StoreService) storeService: IStoreService,
        @inject(ContainerIoC.WebSocketService) private ws: IWebSocketService,
    ) {
        super(logger, configService, storeService);

        this.logger.info(`Register route for ${this.constructor.name}`);

        this.registerRoute({
            path: '/',
            method: HttpMethod.Get,
            handler: this.getList,
        });

        this.registerRoute({
            path: '/',
            method: HttpMethod.Post,
            handler: this.create,
        });

        this.registerRoute({
            path: '/:id',
            method: HttpMethod.Delete,
            handler: this.delete,
        });

        this.registerRoute({
            path: '/:id',
            method: HttpMethod.Patch,
            handler: this.change,
        });
    }

    /**
     * Получение списка задач
     * @param _req
     * @param res
     */
    async getList(_req: Request, res: Response) {
        this.send(res, StatusCodes.OK, this.storeService.data.tasks);
    }

    /**
     * Добавление задачи в список
     * @param req Объект запроса
     * @param res Объект ответа
     */
    async create(req: Request<Record<string, unknown>, Record<string, unknown>, { title: string }>, res: Response) {
        const { title } = req.body;
        const record: Task = {
            title,
            id: uuidv4(),
            completed: false,
        };
        this.storeService.updateStore({
            ...this.storeService.data,
            tasks: [...this.storeService.data.tasks, record],
        });
        this.created(res, record);
    }

    /**
     * Удаление задачи их списка
     * @param req Объект запроса
     * @param res Объект ответа
     */
    async delete(req: Request, res: Response) {
        this.storeService.updateStore({
            ...this.storeService.data,
            tasks: this.storeService.data.tasks.filter((item) => item.id !== req.params.id),
        });
        this.noContent(res);
        this.sendEvent(req.params.id);
    }

    /**
     * Изменение задачи
     * @param req Объект запроса
     * @param res Объект ответа
     */
    async change(req: Request<Record<string, unknown>, Record<string, unknown>, Task>, res: Response) {
        const { completed, id, title } = req.body;
        this.storeService.updateStore({
            ...this.storeService.data,
            tasks: this.storeService.data.tasks.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        completed,
                        title,
                    };
                }
                return { ...item };
            }),
        });
        this.send(
            res,
            StatusCodes.OK,
            this.storeService.data.tasks.find((item) => item.id === id),
        );
    }

    private sendEvent(id: string) {
        setTimeout(() => {
            this.logger.info('Sending event...');
            this.ws.getInstance().send(
                JSON.stringify({
                    payload: {
                        id,
                    },
                }),
            );
        }, 2000);
    }
}
