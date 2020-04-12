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
const user_1 = require("../models/user/user");
//Creating a class to export the auth functions
class AuthController {
    constructor() { }
    //For GET in api/auth/profile
    getProfile(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.userId;
            const profile = yield authServices_1.default.profile(id);
            return res.status(200).json(profile);
        });
    }
    //For POST in api/auth/register
    postRegister(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const user = new user_1.AuthUser(username, email, password);
            const register = yield authServices_1.default.register(user);
            let message = {};
            if (register === '') {
                message.error = 'Email or username exsits';
                return res.json(message).status(400);
            }
            else {
                message.success = 'Added user';
                res.header('token', register);
                return res.json(message).status(201);
            }
        });
    }
    //For POST in api/auth/login
    postLogin(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const user = new user_1.AuthUser(username, email, password);
            const login = yield authServices_1.default.login(user);
            let message = {};
            if (login === '') {
                message.error = 'Email or password are wrong';
                return res.json(message).status(400);
            }
            else {
                message.success = 'User loged';
                res.header('token', login);
                return res.json(message).status(200);
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map