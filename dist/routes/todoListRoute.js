"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verification_1 = __importDefault(require("./auth/verification"));
const todoList_controller_1 = __importDefault(require("../controllers/todoList.controller"));
//Creating class that will manage routes
class TodoList {
    constructor(route) {
        this.route = route;
        this.router = express_1.Router();
        this.routes();
    }
    //A function where we manage the routes
    routes() {
        this.router
            .route('/')
            .get(verification_1.default, todoList_controller_1.default.getTodoList)
            .post(verification_1.default, todoList_controller_1.default.postTodoList)
            .delete(verification_1.default, todoList_controller_1.default.deleteTodoList);
    }
    //Making a function to export the router of the class
    getRouter() {
        return this.router;
    }
}
const todoList = new TodoList('api/');
exports.default = todoList.getRouter();
//# sourceMappingURL=todoListRoute.js.map