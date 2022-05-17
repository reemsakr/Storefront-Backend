"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.destroy = exports.create = exports.show = exports.index = void 0;
const product_model_1 = require("../models/product_model");
//import jwt from 'jsonwebtoken';
// import db from '../database';
const store = new product_model_1.productsStore();
// handler functions here
const index = async (_req, res) => {
    const product = await store.index();
    res.json(product);
};
exports.index = index;
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
exports.show = show;
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        };
        const newproduct = await store.create(product);
        res.json(newproduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const destroy = async (_req, res) => {
    const newuproduct = await store.delete(_req.params.id);
    res.json(newuproduct);
};
exports.destroy = destroy;
const update = async (req, res) => {
    const product = {
        id: parseInt(req.params.id),
        name: req.body.name,
        price: req.body.price
    };
    const newproduct = await store.update(product);
    res.json(newproduct);
};
exports.update = update;
