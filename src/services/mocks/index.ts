import { Server, Model } from 'miragejs';
import { todos } from './fixtures';
import { todosRoutes } from './routes';

export const createServer = ({ environment = 'development' } = {}): void => {
    // eslint-disable-next-line
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
            this.passthrough('/locales/**');
        },
    });
};
