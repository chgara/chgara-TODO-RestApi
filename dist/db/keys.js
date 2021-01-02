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
const host = process.env.DBHOST || 'hola';
const password = process.env.DBPASS || dbPwd_1.default.getPassword();
const user = process.env.DBUSER || 'root';
const name = process.env.DBNAME || 'TODOLIST';
console.log(host, password, user, name);
const Db = new Keys(2, host, user, password, name);
/*const Db: Ikey = new Keys(
    5,
    'localhost',
    'root',
    dbPassword.getPassword(),
    'apirest',
);*/
exports.default = Db;
//# sourceMappingURL=keys.js.map