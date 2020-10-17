import jwt from 'jsonwebtoken';
import Iuser from '../../models/user/Iuser';
import Register from './register';
import Login from './login';
import { AuthUser, DBuser } from '../../models/user/user';
import DB from '../../db/Idb';
import Database from '../../db/database';
import { token } from '../../config/types';
import Profile from './profile';
class AuthServices {
    private database: DB;

    constructor(db: DB) {
        this.database = db;
    }

    //Register a user and returns false or a token.
    public async register(user: AuthUser): Promise<string> {
        const register: Register = new Register(user);
        try {
            const success: boolean = await register.main(this.database);

            if (!success) {
                return '';
            } else {
                const DbUser: DBuser = await register.getRegisterdUser(this.database);
                const Token: string = jwt.sign(
                    { _id: DbUser.getId() },
                    process.env.JWT || 'secret token',
                    { expiresIn: 60 * 60 * 24 * 7 },
                );
                return Token;
            }
        } catch (error) {
            return '';
        }
    }

    //Logs a user and returns false or a token
    public async login(user: AuthUser): Promise<string> {
        const login: Login = new Login(user);
        try {
            const success: boolean = await login.main(this.database);

            if (!success) {
                return '';
            } else {
                const DbUser: DBuser = await login.getLogedUser(this.database);
                const Token: string = jwt.sign(
                    { _id: DbUser.getId() },
                    process.env.JWT || 'secret token',
                    { expiresIn: 60 * 60 * 24 * 7 },
                );
                return Token;
            }
        } catch (error) {
            return '';
        }
    }

    public async profile(id: number): Promise<DBuser> {
        const profile: Profile = new Profile(id);
        const user: DBuser = await profile.main(this.database);
        return user;
    }
}
const authServices: AuthServices = new AuthServices(Database);
export default authServices;
