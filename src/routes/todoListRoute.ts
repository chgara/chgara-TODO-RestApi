import { Router, IRouter } from 'express';

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
        this.router.route('/').get().post().put().delete();
    }

    //Making a function to export the router of the class
    public getRouter(): IRouter {
        return this.router;
    }
}
const todoList: TodoList = new TodoList('api/');
export default todoList.getRouter();
