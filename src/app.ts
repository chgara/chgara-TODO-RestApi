import express, { Application } from 'express';
import { cyan, red } from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AuthRoutes from './routes/authRoute';
import IndexRoutes from './routes/indexRoute';
import TodoListRoutes from './routes/todoListRoute';
import cors from 'cors';
import path from 'path';

const dir = path.resolve(__dirname, '../.env');
console.log(dir);
dotenv.config({ path: dir });
//Creating class to make server objects
class App {
	private port: number | string;
	private app: Application;

	constructor(port?: number) {
		//Port can be a process or undefined and it will be 300
		this.port = process.env.PORT || port || 3000;
		this.app = express();
		//Configuring for catch the variables of the system
		this.settings();
		this.midlewares();
		this.routes();
		this.error();
		this.listen();
	}

	//Settings configuration for express
	settings(): void {
		this.app.use(cors());
	}

	//Midlewares that use the app
	midlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(morgan('dev'));
		this.app.use((req, res, next) => {
			res.append('Access-Control-Allow-Headers', 'Content-Type');
			res.append('Access-Control-Expose-Headers', 'token');
			next();
		});
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
