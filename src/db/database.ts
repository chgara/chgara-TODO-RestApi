import pool from './connection';
import DB, { IdbData } from './Idb';
import { DBuser, AuthUser } from '../models/user/user';
import bcrypt from '../config/bcrypt';
import { red } from 'colors';

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
        const DbUser: DBuser = await this.searchUser(user.getEmail());
        const success: boolean = bcrypt.comparePassword(user.getAuth(), DbUser.getAuth());

        if (success) {
            return true;
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
        const sql = 'SELECT * FROM users WHERE username = ?';
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
