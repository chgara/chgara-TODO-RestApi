import { Request, Response, NextFunction } from 'express';
import {} from 'colors';
import authServices from '../services/auth/authServices';
import { AuthUser, DBuser } from '../models/user/user';
import { Imessage } from './Iauth';

//Creating a class to export the auth functions
class AuthController {
    constructor() {}
    //For GET in api/auth/profile
    public async getProfile(
        req: Request,
        res: Response,
        nex: NextFunction,
    ): Promise<Response> {
        const id: number = req.userId;
        const profile: DBuser = await authServices.profile(id);
        return res.status(200).json(profile);
    }
    //For POST in api/auth/register
    public async postRegister(
        req: Request,
        res: Response,
        nex: NextFunction,
    ): Promise<Response> {
        const { username, email, password } = req.body;
        const user: AuthUser = new AuthUser(username, email, password);
        const register: string = await authServices.register(user);
        let message: Imessage = {};
        if (register === '') {
            message.error = 'Email or username exsits';
            return res.status(400).json(message);
        } else {
            message.success = 'Added user';
            res.header('token', register);
            return res.status(201).json(message);
        }
    }
    //For POST in api/auth/login
    public async postLogin(
        req: Request,
        res: Response,
        nex: NextFunction,
    ): Promise<Response> {
        const { username, email, password } = req.body;
        const user: AuthUser = new AuthUser(username, email, password);
        const login: string = await authServices.login(user);
        let message: Imessage = {};
        if (login === '') {
            message.error = 'Email or password are wrong';
            return res.status(400).json(message);
        } else {
            message.success = 'User loged';
            res.header('token', login);
            return res.status(200).json(message);
        }
    }
}
const authController: AuthController = new AuthController();
export default authController;
