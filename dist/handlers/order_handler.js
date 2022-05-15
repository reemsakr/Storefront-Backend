"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.destroy = exports.show = exports.index = void 0;
const order_model_1 = require("../models/order_model");
//import jwt from 'jsonwebtoken';
// import db from '../database';
const store = new order_model_1.ordersStore();
// handler functions here
const index = async (_req, res) => {
    const order = await store.index();
    res.json(order);
};
exports.index = index;
const show = async (req, res) => {
    const order = await store.show(req.params.user_id);
    res.json(order);
};
exports.show = show;
const destroy = async (_req, res) => {
    const neworder = await store.delete(_req.params.id);
    res.json(neworder);
};
exports.destroy = destroy;
const create = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status
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