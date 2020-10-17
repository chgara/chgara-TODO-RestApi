import pool from './connection';
import DB, { IdbData, IobjectPackage } from './Idb';
import { DBuser, AuthUser } from '../models/user/user';
import bcrypt from '../config/bcrypt';
import { TodoList, Itodo } from 'models/service/Ilist';

//A class that interacts with the DB

class MysqlDB implements DB {
    //This function add a user of the Register
    async addUser(user: AuthUser): Promise<boolean> {
        const existentEmail: boolean = await this.findEmail(user.getEmail());
        const existentUsername: boolean = await this.findUsername(user.getUsername());
        if (existentEmail || existentUsername) {
            return false;
        }

        const password: string = bcrypt.encryptPassword(user.getAuth());
        const sql = 'INSERT INTO users(username,email,password) VALUES(?,?,?)';
        await pool.query(sql, [user.getUsername(), user.getEmail(), password]);
        return true;
    }

    //Compare users returning a boolean
    async compareUsers(user: AuthUser): Promise<boolean> {
        const existentEmail: boolean = await this.findEmail(user.getEmail());
        if (existentEmail) {
            const DbUser: DBuser = await this.searchUser(user.getEmail());
            const success: boolean = bcrypt.comparePassword(
                user.getAuth(),
                DbUser.getAuth(),
            );
            return success;
        } else {
            return false;
        }
    }

    //With this function we find a user and we return a DB user
    async searchUser(email: string): Promise<DBuser> {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const rows: Array<IdbData> = await pool.query(sql, email);
        const DBdata: IdbData = rows[0];
        const DbUser: DBuser = new DBuser(
            DBdata.username,
            DBdata.email,
            DBdata.password,
            DBdata.id,
        );
        return DbUser;
    }
    //Search the user but with the ID
    async searchUserById(id: number): Promise<DBuser> {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const rows: Array<IdbData> = await pool.query(sql, id);
        const DBdata: IdbData = rows[0];
        const DbUser: DBuser = new DBuser(
            DBdata.username,
            DBdata.email,
            DBdata.password,
            DBdata.id,
        );
        return DbUser;
    }

    //A funtion that will return a user TODOLIST
    async getTodoList(user: DBuser): Promise<TodoList> {
        const sql: string = 'SELECT * FROM list WHERE username = ?';
        const rows: TodoList = await pool.query(sql, user.getUsername());
        return rows;
    }

    //This function will add a TODO to the List
    async addTodo(user: DBuser, todo: string): Promise<boolean> {
        const sql: string = 'INSERT INTO list(todo,username) VALUES(?,?)';
        const rows: IobjectPackage = await pool.query(sql, [todo, user.getUsername()]);
        if (typeof rows === 'object') {
            if (rows.affectedRows !== 1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    //This delete a TODO from the list
    async deleteTodo(user: DBuser, todo: Itodo): Promise<boolean> {
        const sql: string = 'DELETE FROM list WHERE id = ? AND username = ?';
        const rows: IobjectPackage = await pool.query(sql, [todo.id, user.getUsername()]);
        if (typeof rows === 'object') {
            if (rows.affectedRows !== 1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    //Function to show if the username extists
    private async findUsername(username: string): Promise<boolean> {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const rows: Array<any> = await pool.query(sql, username);
        if (rows.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    //The same as the other but with a email
    private async findEmail(email: string): Promise<boolean> {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const rows: Array<any> = await pool.query(sql, email);
        if (rows.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}
//The DB instance  are of the type DB
const database: DB = new MysqlDB();
export default database;
