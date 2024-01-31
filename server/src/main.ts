import 'reflect-metadata';
import { Container } from 'inversify';
import { StoreService } from './services/store/index.js';
import { IStoreService } from './services/store/contracts/index.js';
import { LoggerService } from './services/logger/index.js';
import { ILogger } from './services/logger/contracts/index.js';
import { ConfigService } from './services/config/index.js';
import { IConfig } from './services/config/contracts/index.js';
import { Application } from './application.js';
import { IController } from './services/controller/contracts/index.js';
import { ContainerIoC } from './constants/index.js';
import { TodoController } from './modules/todo/index.js';
import { ExceptionFilter, IExceptionFilter } from './services/error/index.js';

const container = new Container();
container.bind<Application>(ContainerIoC.Application).to(Application).inSingletonScope();
container.bind<IExceptionFilter>(ContainerIoC.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
container.bind<IStoreService>(ContainerIoC.StoreService).to(StoreService).inSingletonScope();
container.bind<ILogger>(ContainerIoC.LoggerService).to(LoggerService).inSingletonScope();
container.bind<IConfig>(ContainerIoC.ConfigService).to(ConfigService).inSingletonScope();

// регистрация контроллеров
container.bind<IController>(ContainerIoC.TodoController).to(TodoController).inSingletonScope();

const app = container.get<Application>(ContainerIoC.Application);

await app.init();
