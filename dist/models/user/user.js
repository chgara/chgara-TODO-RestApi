"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class User extends DBuser {
    constructor(name, email, id, list, password) {
        super(name, email, password, id);
        this.list = list;
    }
    getList() {
        return this.list;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map