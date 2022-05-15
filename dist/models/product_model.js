"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsStore = void 0;
const database_1 = __importDefault(require("../database"));
class productsStore {
    // static authentication: any;
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = conn.query(sql);
            conn.release();
            return (await result).rows;
        }
        catch (err) {
            throw new Error(`could not get products :${err}`);
        }
    }
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name,price)VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            const product = result.rows[0];
            return product;
        }
        catch (err) {
            throw new Error(`connet get product ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`connet get product ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`can not delete product ${err}`);
        }
    }
}
exports.productsStore = productsStore;
