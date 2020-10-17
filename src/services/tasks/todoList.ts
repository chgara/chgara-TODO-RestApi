import { DBuser } from 'models/user/user';
import DB from 'db/Idb';
import { TodoList, Itodo } from 'models/service/Ilist';
class TODOList {
    private user: DBuser;

    constructor(user: DBuser) {
        this.user = user;
    }

    public async getList(db: DB): Promise<TodoList> {
        const todoList: TodoList = await db.getTodoList(this.user);
        return todoList;
    }
    public async deleteTodo(db: DB, todo: Itodo): Promise<boolean> {
        const deletedList: boolean = await db.deleteTodo(this.user, todo);
        return deletedList;
    }
    public async addTodo(db: DB, todo: string): Promise<boolean> {
        const addedTodo: boolean = await db.addTodo(this.user, todo);
        return addedTodo;
    }
}
export default TODOList;
