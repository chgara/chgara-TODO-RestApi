import { Router, IRouter } from 'express';
//Importing the methods of AUTHCONTROLLER that will manage the petitions
import AuthController from '../controllers/auth.controller';
import verify from './auth/verification';

//Creating class that will manage routes
class AuthRoutes {
    private route: string;
    private router: IRouter;

    constructor(route: string) {
        this.route = route;
        this.router = Router();
        this.routes();
    }

    //A function where we manage the routes
    private routes(): void {
        this.router.route(`/profile`).get(verify, AuthController.getProfile);
        this.router.route(`/login`).post(AuthController.postLogin);
        this.router.route(`/register`).post(AuthController.postRegister);
    }

    //Making a function to export the router of the class
    public getRouter(): IRouter {
        return this.router;
    }
}
const authRoutes: AuthRoutes = new AuthRoutes('api/auth');
export default authRoutes.getRouter();
