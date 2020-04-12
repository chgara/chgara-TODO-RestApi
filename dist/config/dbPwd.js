"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//An class to get the DB password, I added because i want more security :)
class dbPassword {
    constructor(pwd) {
        this.password = pwd;
    }
    getPassword() {
        return this.password;
    }
}
const pwd = new dbPassword('airsoftG15935700g%');
//const pwd: dbPassword = new dbPassword('airsoftG15935700g%');
exports.default = pwd;
//# sourceMappingURL=dbPwd.js.map