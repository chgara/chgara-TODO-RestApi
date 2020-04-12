import express, { Application, urlencoded } from 'express';
import { cyan, red } from 'colors';
import morgan from 'morgan';
import dotenv, { load } from 'dotenv';
import AuthRoutes from './routes/authRoute';
import IndexRoutes from './routes/indexRoute';

//Connecting to the DB
const pool = require('./db/connection');

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
    }

    //Make server listen on a port
    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`${cyan('Server on port:')} ${red(`${this.port}`)}`);
        });
    }
}
export default App;
