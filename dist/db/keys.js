"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Creating the keys for the DB connection
const dbPwd_1 = __importDefault(require("../config/dbPwd"));
class Keys {
    constructor(connectionLimit, host, user, password, database) {
        this.database = {
            connectionLimit,
            host,
            user,
            password,
            database,
        };
    }
    get db() {
        return this.database;
    }
}
const password = process.env.DBPASS || dbPwd_1.default.getPassword();
const Db = new Keys(5, 'localhost', 'root', password, 'TODOLIST');
/*const Db: Ikey = new Keys(
    5,
    'localhost',
    'root',
    dbPassword.getPassword(),
    'apirest',
);*/
exports.default = Db;
//# sourceMappingURL=keys.js.map