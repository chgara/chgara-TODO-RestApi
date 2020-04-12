import jwt, { VerifyOptions } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { token } from 'config/types';
import { Imessage } from 'controllers/Iauth';

interface Ipayload extends VerifyOptions {
    _id: number;
    iat: number;
    exp: number;
}

//A function that verify that you have a token
function verify(req: Request, res: Response, next: NextFunction) {
    const Token = req.header('token');
    let message: Imessage = {};
    if (!Token) {
        message.error = 'Access denied';
        return res.json(message).status(401);
    }
    let failure: boolean = false;
    const payload = jwt.verify(
        Token,
        process.env.JWT || 'secret token',
        (err, payload) => {
            if (err) {
                failure = true;
                return;
            }
            if (payload) {
                req.userId = payload._id;
            }
        },
    );
    if (failure) {
        message.error = 'Access denied';
        return res.json(message).status(401);
    }
    next();
}
export default verify;
