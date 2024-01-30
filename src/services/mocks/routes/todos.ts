import { Response as MResponse, Server } from 'miragejs';
import { Task } from '@services/api/__models/todo';
import { v4 as uuidv4 } from 'uuid';

export default (context: Server) => {
    context.get(`/api/todos`, (schema) => {
        return new MResponse(200, {}, schema.db.todos);
    });

    context.post(`/api/todos`, (schema, request) => {
        const { title } = JSON.parse(request.requestBody);
        const newTask: Task = {
            title,
            completed: false,
            id: uuidv4(),
        };
        schema.db.todos.insert(newTask);
        return new MResponse(200, {}, newTask);
    });

    context.delete(`/api/todos/:id`, (schema, request) => {
        const { id } = request.params;
        schema.db.todos.remove(id);
        return new MResponse(200);
    });

    context.put(`/api/todos`, (schema) => {
        return new MResponse(200, {}, schema.db.todos);
    });
};
