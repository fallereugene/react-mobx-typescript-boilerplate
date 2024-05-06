import 'reflect-metadata';
import cors from 'cors';
import express, { Express } from 'express';
import { injectable, inject } from 'inversify';
import { ILogger } from './services/logger/contracts/index.js';
import { IConfig } from './services/config/contracts/index.js';
import { IController } from './services/controller/contracts/index.js';
import { IExceptionFilter } from './services/error/index.js';
import { IWebSocketService } from './services/web-socket/contracts/index.js';
import { ContainerIoC } from './constants/index.js';
import { CommonMiddleware } from './middlewares/index.js';

@injectable()
export class Application {
    private express: Express;

    constructor(
        @inject(ContainerIoC.LoggerService) private logger: ILogger,
        @inject(ContainerIoC.ConfigService) private config: IConfig,
        @inject(ContainerIoC.TaskController) private taskController: IController,
        @inject(ContainerIoC.ExceptionFilter) private exceptionFilter: IExceptionFilter,
        @inject(ContainerIoC.WebSocketService) private ws: IWebSocketService,
    ) {
        this.express = express();
    }

    /**
     * Инициализация приложения
     */
    async init() {
        this.logger.info('Application inintializing...');

        await this.startServer();
    }

    /**
     * Запуск сервера: регистрация роутов, миддлвэров, обработки ошибок и т.д.
     */
    private async startServer() {
        this.initMiddlewares();
        this.initRoutes();
        this.initExceptionFilter();
        this.initSocketConnection();
        this.express.listen(this.config.get('PORT'));

        this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
    }

    /**
     * Регистрация миддлвэров
     */
    private async initMiddlewares() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(new CommonMiddleware().execute.bind(CommonMiddleware));
    }

    /**
     * Регистрация роутов
     */
    private initRoutes() {
        this.express.use(`${this.config.get('BASE_API_URL')}tasks/`, this.taskController.router);
    }

    /**
     * Обработка ошибок
     */
    private initExceptionFilter() {
        this.express.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    /**
     * Инициализация соединения с вебсокетом
     */
    private initSocketConnection() {
        this.ws.connect();
    }
}
