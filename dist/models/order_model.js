"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersStore = void 0;
const database_1 = __importDefault(require("../database"));
class ordersStore {
    // static authentication: any;
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = conn.query(sql);
            conn.release();
            return (await result).rows;
        }
        catch (err) {
            throw new Error(`could not get orders :${err}`);
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (product_id,quantity,user_id,status)VALUES ($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status]);
            conn.release();
            const product = result.rows[0];
            return product;
        }
        catch (err) {
            throw new Error(`can not  get product ${err}`);
        }
    }
    async getOrderByUserId(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`can not get order ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`connet get order ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`can not order user ${err}`);
        }
    }
    async update(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE orders SET product_id=($2),quantity=($3),user_id=($4),status=($5) WHERE id=($1) RETURNING *';
            const result = (await conn.query(sql, [o.id, o.product_id, o.quantity, o.user_id, o.status]));
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`can not update order ${err}`);
        }
    }
}
exports.ordersStore = ordersStore;
