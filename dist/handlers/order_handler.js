"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.destroy = exports.getOrderByUserId = exports.show = exports.index = void 0;
const order_model_1 = require("../models/order_model");
//import jwt from 'jsonwebtoken';
// import db from '../database';
const store = new order_model_1.ordersStore();
// handler functions here
const index = async (_req, res) => {
    try {
        const order = await store.index();
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.show = show;
const getOrderByUserId = async (req, res) => {
    try {
        const order = await store.getOrderByUserId(req.params.user_id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.getOrderByUserId = getOrderByUserId;
const destroy = async (_req, res) => {
    try {
        const neworder = await store.delete(_req.params.id);
        res.json(neworder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.destroy = destroy;
const create = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const neworder = await store.create(order);
        res.json(neworder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const order = {
            id: parseInt(req.params.id),
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const neworder = await store.update(order);
        res.json(neworder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.update = update;
