"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const mysql_1 = __importDefault(require("mysql"));
const colors_1 = require("colors");
const keys_1 = __importDefault(require("./keys"));
exports.pool = mysql_1.default.createPool(keys_1.default.db);
exports.pool.getConnection((err, connection) => {
    if (err) {
        console.log(colors_1.red('ERROR: '), err);
        return;
    }
    if (connection) {
        connection.release();
        console.log(colors_1.red('DB'), colors_1.blue(' connected'));
        return;
    }
});
exports.pool.query = util_1.promisify(exports.pool.query);
exports.default = exports.pool;
//# sourceMappingURL=connection.js.map