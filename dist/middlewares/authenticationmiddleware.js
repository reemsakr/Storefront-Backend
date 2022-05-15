"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleUnauthorizedError = (res) => {
    return res.status(401).json({
        message: 'login failed:please try again'
    });
};
const validateTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                if (decode) {
                    next();
                }
                else {
                    handleUnauthorizedError(res);
                }
            }
            else {
                handleUnauthorizedError(res);
            }
        }
        else {
            handleUnauthorizedError(res);
        }
    }
    catch (error) {
        handleUnauthorizedError(res);
    }
};
exports.default = validateTokenMiddleware;
