"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_1 = require("colors");
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const todoListRoute_1 = __importDefault(require("./routes/todoListRoute"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dir = path_1.default.resolve(__dirname, '../.env');
console.log(dir);
dotenv_1.default.config({ path: dir });
//Creating class to make server objects
class App {
    constructor(port) {
        //Port can be a process or undefined and it will be 300
        this.port = process.env.PORT || port || 3000;
        this.app = express_1.default();
        //Configuring for catch the variables of the system
        this.settings();
        this.midlewares();
        this.routes();
        this.error();
        this.listen();
    }
    //Settings configuration for express
    settings() {
        this.app.use(cors_1.default());
    }
    //Midlewares that use the app
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(morgan_1.default('dev'));
        this.app.use((req, res, next) => {
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            res.append('Access-Control-Expose-Headers', 'token');
            next();
        });
    }
    //The routes that will be managed
    routes() {
        this.app.use('/api', indexRoute_1.default);
        this.app.use('/api/auth', authRoute_1.default);
        this.app.use('/api/list', todoListRoute_1.default);
    }
    error() {
        this.app.use((req, res, next) => {
            res.status(404).redirect('/api');
            next();
        });
    }
    //Make server listen on a port
    listen() {
        this.app.listen(this.port, () => {
            console.log(`${colors_1.cyan('Server on port:')} ${colors_1.red(`${this.port}`)}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map