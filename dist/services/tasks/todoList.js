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
Object.defineProperty(exports, "__esModule", { value: true });
class TODOList {
    constructor(user) {
        this.user = user;
    }
    getList(db) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoList = yield db.getTodoList(this.user);
            return todoList;
        });
    }
    deleteTodo(db, todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedList = yield db.deleteTodo(this.user, todo);
            return deletedList;
        });
    }
    addTodo(db, todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedTodo = yield db.addTodo(this.user, todo);
            return addedTodo;
        });
    }
}
exports.default = TODOList;
//# sourceMappingURL=todoList.js.map