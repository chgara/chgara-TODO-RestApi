"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//A function that verify that you have a token
function verify(req, res, next) {
    const Token = req.header('token');
    let message = {};
    if (!Token) {
        message.error = 'Access denied';
        return res.json(message).status(401);
    }
    let failure = false;
    const payload = jsonwebtoken_1.default.verify(Token, process.env.JWT || 'secret token', (err, payload) => {
        if (err) {
            failure = true;
            return;
        }
        if (payload) {
            //@ts-expect-error
            req.userId = payload._id;
        }
    });
    if (failure) {
        message.error = 'Access denied';
        return res.json(message).status(401);
    }
    next();
}
exports.default = verify;
//# sourceMappingURL=verification.js.map