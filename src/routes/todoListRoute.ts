import { Router, IRouter } from 'express';
import verify from './auth/verification';
import todoListController from '../controllers/todoList.controller';

//Creating class that will manage routes
class TodoList {
    private route: string;
    private router: IRouter;

    constructor(route: string) {
        this.route = route;
        this.router = Router();
        this.routes();
    }

    //A function where we manage the routes
    private routes(): void {
        this.router
            .route('/')
            .get(verify, todoListController.getTodoList)
            .post(verify, todoListController.postTodoList)
            .delete(verify, todoListController.deleteTodoList);
    }

    //Making a function to export the router of the class
    public getRouter(): IRouter {
        return this.router;
    }
}
const todoList: TodoList = new TodoList('api/');
export default todoList.getRouter();
