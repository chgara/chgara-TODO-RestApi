"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing the methods of AUTHCONTROLLER that will manage the petitions
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const verification_1 = __importDefault(require("./auth/verification"));
//Creating class that will manage routes
class AuthRoutes {
    constructor(route) {
        this.route = route;
        this.router = express_1.Router();
        this.routes();
    }
    //A function where we manage the routes
    routes() {
        this.router.route(`/profile`).get(verification_1.default, auth_controller_1.default.getProfile);
        this.router.route(`/login`).post(auth_controller_1.default.postLogin);
        this.router.route(`/register`).post(auth_controller_1.default.postRegister);
    }
    //Making a function to export the router of the class
    getRouter() {
        return this.router;
    }
}
const authRoutes = new AuthRoutes('api/auth');
exports.default = authRoutes.getRouter();
//# sourceMappingURL=authRoute.js.map