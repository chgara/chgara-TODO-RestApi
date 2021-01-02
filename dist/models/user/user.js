"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBuser = exports.AuthUser = exports.PrimitiveUser = void 0;
/*
 *   Classes for user models
 */
//The parent Model, it wont be used by the Api, it can be good for the polimorfism
class PrimitiveUser {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    getUsername() {
        return this.name;
    }
}
exports.PrimitiveUser = PrimitiveUser;
class AuthUser extends PrimitiveUser {
    constructor(name, email, password) {
        super(name, email);
        this.password = password;
    }
    getAuth() {
        return this.password;
    }
}
exports.AuthUser = AuthUser;
class DBuser extends AuthUser {
    constructor(name, email, password, Id) {
        super(name, email, password);
        this.id = Id;
    }
    getId() {
        return this.id;
    }
}
exports.DBuser = DBuser;
// export class User extends DBuser {
//     protected list: TodoList;
//     constructor(
//         name: string,
//         email: string,
//         id: number,
//         list: TodoList,
//         password: string,
//     ) {
//         super(name, email, password, id);
//         this.list = list;
//     }
//     getList(): TodoList {
//         return this.list;
//     }
// }
//# sourceMappingURL=user.js.map