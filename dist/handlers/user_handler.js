"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.destroy = exports.authentication = exports.create = exports.show = exports.index = void 0;
const user_model_1 = require("../models/user_model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_model_1.usersStore();
// handler functions here
const index = async (_req, res) => {
    try {
        const user = await store.index();
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.show = show;
const create = async (req, res) => {
    try {
        const user = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_digest: req.body.password_digest,
            username: req.body.username,
        };
        const newuser = await store.create(req.body);
        res.json(newuser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const authentication = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password_digest;
        const user = await store.authentication(username, password);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'the username and passowrd does not match , please try again',
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'user authenticated successfuly',
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.authentication = authentication;
const destroy = async (_req, res) => {
    try {
        const newuser = await store.delete(_req.params.id);
        res.json(newuser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.destroy = destroy;
const update = async (req, res) => {
    try {
        const user = {
            id: parseInt(req.params.id),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_digest: req.body.password_digest,
            username: req.body.username,
        };
        const newuser = await store.update(user);
        res.json(newuser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.update = update;
