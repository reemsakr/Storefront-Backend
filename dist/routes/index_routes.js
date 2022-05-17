"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./api/user_routes"));
const order_routes_1 = __importDefault(require("./api/order_routes"));
const product_routes_1 = __importDefault(require("./api/product_routes"));
const order_products_routes_1 = __importDefault(require("./api/order_products_routes"));
const routes = (0, express_1.Router)();
routes.use('/users', user_routes_1.default);
routes.use('/orders', order_routes_1.default);
routes.use('/products', product_routes_1.default);
routes.use('/order_products', order_products_routes_1.default);
exports.default = routes;
