import { DBuser } from '../../models/user/user';
import DB from '../../db/Idb';
import Database from '../../db/database';
import TODOList from './todoList';
import { TodoList, Itodo } from 'models/service/Ilist';
//This class will have the logic of the todoList
class TodoListServices {
    private database: DB;

    constructor(db: DB) {
        this.database = db;
    }

    //This return the todoList
    public async getTodoList(user: DBuser): Promise<TodoList> {
        const todos: TODOList = new TODOList(user);
        const list: TodoList = await todos.getList(this.database);
        return list;
    }
    //This will delete a todo
    public async deleteTodo(user: DBuser, todo: Itodo): Promise<boolean> {
        const todos: TODOList = new TODOList(user);
        const succes: boolean = await todos.deleteTodo(this.database, todo);
        return succes;
    }
    public async addTodo(user: DBuser, todo: string): Promise<boolean> {
        const todos: TODOList = new TODOList(user);
        const succes: boolean = await todos.addTodo(this.database, todo);
        return succes;
    }
}
const todoListServices: TodoListServices = new TodoListServices(Database);
export default todoListServices;
