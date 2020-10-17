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
const database_1 = __importDefault(require("../../db/database"));
const todoList_1 = __importDefault(require("./todoList"));
//This class will have the logic of the todoList
class TodoListServices {
    constructor(db) {
        this.database = db;
    }
    //This return the todoList
    getTodoList(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = new todoList_1.default(user);
            const list = yield todos.getList(this.database);
            return list;
        });
    }
    //This will delete a todo
    deleteTodo(user, todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = new todoList_1.default(user);
            const succes = yield todos.deleteTodo(this.database, todo);
            return succes;
        });
    }
    addTodo(user, todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = new todoList_1.default(user);
            const succes = yield todos.addTodo(this.database, todo);
            return succes;
        });
    }
}
const todoListServices = new TodoListServices(database_1.default);
exports.default = todoListServices;
//# sourceMappingURL=todoListServices.js.map