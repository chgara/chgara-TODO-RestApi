"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Creating class that will manage routes
class IndexRoutes {
    constructor(route) {
        this.route = route;
        this.router = express_1.Router();
        this.routes();
    }
    //A function where we manage the routes
    routes() {
        this.router.route(`/`).get((req, res, nex) => {
            res.send('This is the chgara TODO-List Rest-Api, go to https://github.com/chgara to know more');
        });
    }
    //Making a function to export the router of the class
    getRouter() {
        return this.router;
    }
}
const indexRoutes = new IndexRoutes('api/');
exports.default = indexRoutes.getRouter();
//# sourceMappingURL=indexRoute.js.map