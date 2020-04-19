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
const authServices_1 = __importDefault(require("../services/auth/authServices"));
const todoListServices_1 = __importDefault(require("../services/tasks/todoListServices"));
const list_1 = __importDefault(require("../models/service/list"));
//Creating a class to export the auth functions
class TodoListController {
    constructor() { }
    //For GET in api/list
    getTodoList(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.userId;
            const profile = yield authServices_1.default.profile(id);
            const todoList = yield todoListServices_1.default.getTodoList(profile);
            return res.status(200).json(todoList);
        });
    }
    //For delete in api/list
    deleteTodoList(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = req.userId;
            const profile = yield authServices_1.default.profile(Id);
            const { id, todo, created_at, username } = req.body;
            let message = {};
            if (!id || !todo || !created_at || !username) {
                message.error = 'Fill all the fields';
                return res.status(400).json(message);
            }
            const Todo = new list_1.default(id, todo, created_at, username);
            const deleteTodoList = yield todoListServices_1.default.deleteTodo(profile, Todo);
            if (!deleteTodoList) {
                message.error = 'Something went wrong';
                return res.status(400).json(message);
            }
            else {
                message.success = 'Deleted successfully';
                return res.status(200).json(message);
            }
        });
    }
    //Add a todo in api/list
    postTodoList(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.userId;
            const profile = yield authServices_1.default.profile(id);
            const todo = req.body.todo;
            let message = {};
            if (!todo) {
                message.error = 'Add a todo';
                return res.status(400).json(message);
            }
            const addedTodo = yield todoListServices_1.default.addTodo(profile, todo);
            if (!addedTodo) {
                message.error = 'Something went wrong';
                return res.status(400).json(message);
            }
            else {
                message.success = 'Added successfully';
                return res.status(200).json(message);
            }
        });
    }
}
const todoListController = new TodoListController();
exports.default = todoListController;
//# sourceMappingURL=todoList.controller.js.map