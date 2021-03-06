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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const database_1 = __importDefault(require("../../db/database"));
class AuthServices {
    constructor(db) {
        this.database = db;
    }
    //Register a user and returns false or a token.
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const register = new register_1.default(user);
            const success = yield register.main(database_1.default);
            if (!success) {
                return false;
            }
            else {
                const DbUser = yield register.getRegisterdUser(database_1.default);
                const Token = jsonwebtoken_1.default.sign({ _id: DbUser.getId() }, process.env.JWT || 'secret token', { expiresIn: 60 * 60 * 24 * 7 });
                return Token;
            }
        });
    }
    //Logs a user and returns false or a token
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = new login_1.default(user);
            const success = yield login.main(database_1.default);
            if (!success) {
                return false;
            }
            else {
                const DbUser = yield login.getLogedUser(database_1.default);
                const Token = jsonwebtoken_1.default.sign({ _id: DbUser.getId() }, process.env.JWT || 'secret token', { expiresIn: 60 * 60 * 24 * 7 });
                return Token;
            }
        });
    }
}
const authServices = new AuthServices(database_1.default);
exports.default = authServices;
//# sourceMappingURL=userServices.js.map