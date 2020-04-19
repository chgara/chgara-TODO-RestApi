import { Request, Response, NextFunction } from 'express';
import {} from 'colors';
import authServices from '../services/auth/authServices';
import { AuthUser, DBuser } from '../models/user/user';
import { Imessage } from './Iauth';
import { Itodo, TodoList } from 'models/service/Ilist';
import todoListServices from '../services/tasks/todoListServices';
import TODO from '../models/service/list';

//Creating a class to export the auth functions
class TodoListController {
    constructor() {}
    //For GET in api/list
    public async getTodoList(
        req: Request,
        res: Response,
        nex: NextFunction,
    ): Promise<Response> {
        const id: number = req.userId;
        const profile: DBuser = await authServices.profile(id);
        const todoList: TodoList = await todoListServices.getTodoList(profile);
        return res.status(200).json(todoList);
    }
    //For delete in api/list
    public async deleteTodoList(
        req: Request,
        res: Response,
        nex: NextFunction,
    ): Promise<Response> {
        const Id: number = req.userId;
        const profile: DBuser = await authServices.profile(Id);
        const { id, todo, created_at, username } = req.body;
        let message: Imessage = {};
        if (!id || !todo || !created_at || !username) {
            message.error = 'Fill all the fields';
            return res.status(400).json(message);
        }
        const Todo: TODO = new TODO(id, todo, created_at, username);
        const deleteTodoList: boolean = await todoListServices.deleteTodo(profile, Todo);

        if (!deleteTodoList) {
            message.error = 'Something went wrong';
            return res.status(400).json(message);
        } else {
            message.success = 'Deleted successfully';
            return res.status(200).json(message);
        }
    }
    //Add a todo in api/list
    public async postTodoList(
        req: Request,
        res: Response,
        nex: NextFunction,
    ): Promise<Response> {
        const id: number = req.userId;
        const profile: DBuser = await authServices.profile(id);
        const todo = req.body.todo;
        let message: Imessage = {};
        if (!todo) {
            message.error = 'Add a todo';
            return res.status(400).json(message);
        }
        const addedTodo: boolean = await todoListServices.addTodo(profile, todo);

        if (!addedTodo) {
            message.error = 'Something went wrong';
            return res.status(400).json(message);
        } else {
            message.success = 'Added successfully';
            return res.status(200).json(message);
        }
    }
}
const todoListController: TodoListController = new TodoListController();
export default todoListController;
