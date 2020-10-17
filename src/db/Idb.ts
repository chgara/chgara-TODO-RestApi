//Interface o DB that will implement some methods

import { DBuser, AuthUser } from '../models/user/user';
import { TodoList, Itodo } from 'models/service/Ilist';

interface DB {
    searchUser(email: string): Promise<DBuser>;
    searchUserById(id: number): Promise<DBuser>;
    addUser(user: AuthUser): Promise<boolean>;
    compareUsers(user: AuthUser): Promise<boolean>;
    getTodoList(user: DBuser): Promise<TodoList>;
    addTodo(user: DBuser, todo: string): Promise<boolean>;
    deleteTodo(user: DBuser, todo: Itodo): Promise<boolean>;
}
export interface IdbData {
    id: number;
    username: string;
    email: string;
    password: string;
}
export interface IobjectPackage {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}
export default DB;
