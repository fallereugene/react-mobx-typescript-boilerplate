import { Server, Model } from 'miragejs';
import { todos } from './fixtures';
import { todosRoutes } from './routes';

export const createServer = (cb: () => any, { environment = 'development' } = {}): void => {
    Promise.resolve().then(() => {
        new Server({
            environment,

            models: {
                todos: Model,
            },

            fixtures: {
                todos,
            },

            seeds(server) {
                server.loadFixtures();
            },

            routes() {
                todosRoutes(this);
            },
        });
        cb();
    });
};
