import express, { Application } from 'express';
import { cyan, red } from 'colors';
import morgan from 'morgan';
import dotenv, { load } from 'dotenv';
import AuthRoutes from './routes/authRoute';
import IndexRoutes from './routes/indexRoute';
import TodoListRoutes from './routes/todoListRoute';
import pool from './db/connection';

//Creating class to make server objects
class App {
    private port: number | string;
    private app: Application;

    constructor(port?: number) {
        //Port can be a process or undefined and it will be 300
        this.port = process.env.PORT || port || 3000;
        this.app = express();
        //Configuring for catch the variables of the system
        dotenv.config();
        this.settings();
        this.midlewares();
        this.routes();
        this.error();
        this.listen();
    }

    //Settings configuration for express
    settings(): void {}

    //Midlewares that use the app
    midlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
    }

    //The routes that will be managed
    routes(): void {
        this.app.use('/api', IndexRoutes);
        this.app.use('/api/auth', AuthRoutes);
        this.app.use('/api/list', TodoListRoutes);
    }

    error(): void {
        this.app.use((req, res, next) => {
            res.status(404).redirect('/api');
            next();
        });
    }

    //Make server listen on a port
    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`${cyan('Server on port:')} ${red(`${this.port}`)}`);
        });
    }
}
export default App;
