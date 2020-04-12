"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const user_1 = require("../models/user/user");
const bcrypt_1 = __importDefault(require("../config/bcrypt"));
//A class that interacts with the DB
class MysqlDB {
    //This function add a user of the Register
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existentEmail = yield this.findEmail(user.getEmail());
            const existentUsername = yield this.findUsername(user.getUsername());
            if (existentEmail || existentUsername) {
                return false;
            }
            const password = bcrypt_1.default.encryptPassword(user.getAuth());
            const sql = 'INSERT INTO users(username,email,password) VALUES(?,?,?)';
            yield connection_1.default.query(sql, [user.getUsername(), user.getEmail(), password]);
            return true;
        });
    }
    //Compare users returning a boolean
    compareUsers(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const DbUser = yield this.searchUser(user.getEmail());
            const success = bcrypt_1.default.comparePassword(user.getAuth(), DbUser.getAuth());
            if (success) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    //With this function we find a user and we return a DB user
    searchUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM users WHERE email = ?';
            const rows = yield connection_1.default.query(sql, email);
            const DBdata = rows[0];
            const DbUser = new user_1.DBuser(DBdata.username, DBdata.email, DBdata.password, DBdata.id);
            return DbUser;
        });
    }
    searchUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM users WHERE id = ?';
            const rows = yield connection_1.default.query(sql, id);
            const DBdata = rows[0];
            const DbUser = new user_1.DBuser(DBdata.username, DBdata.email, DBdata.password, DBdata.id);
            return DbUser;
        });
    }
    //Function to show if the username extists
    findUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM users WHERE username = ?';
            const rows = yield connection_1.default.query(sql, username);
            if (rows.length > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    //The same as the other but with a email
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM users WHERE username = ?';
            const rows = yield connection_1.default.query(sql, email);
            if (rows.length > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
//The DB instance  are of the type DB
const database = new MysqlDB();
exports.default = database;
//# sourceMappingURL=database.js.map