"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddlewarwe = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Woops !! something went wrong !';
    res.status(status).json({ status, message });
};
exports.default = errorMiddlewarwe;
