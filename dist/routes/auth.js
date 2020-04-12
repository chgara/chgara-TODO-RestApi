"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Creating class that will manage routes
class AuthRoutes {
    constructor(route) {
        this.route = route;
        this.router = express_1.Router();
        this.routes();
    }
    //A function where we manage the routes
    routes() {
        this.router.route(`${this.route}/profile`);
        this.router.route(`${this.route}/login`);
        this.router.route(`${this.route}/register`);
    }
    //Making a function to export the router of the class
    getRouter() {
        return this.router;
    }
}
const authRoutes = new AuthRoutes('api/auth');
exports.default = authRoutes.getRouter();
//# sourceMappingURL=auth.js.map