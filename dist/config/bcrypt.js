"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//Creating a class to encrypt or compare passwords
class Bcryptjs {
    constructor(bytes) {
        this.bytes = bytes || 15;
    }
    encryptPassword(password) {
        const salt = bcryptjs_1.default.genSaltSync(this.bytes);
        const encryptedPassword = bcryptjs_1.default.hashSync(password, salt);
        return encryptedPassword;
    }
    comparePassword(password, DbPassword) {
        const success = bcryptjs_1.default.compareSync(password, DbPassword);
        return success;
    }
}
const encripter = new Bcryptjs(10);
exports.default = encripter;
//# sourceMappingURL=bcrypt.js.map