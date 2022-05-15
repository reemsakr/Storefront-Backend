"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const console_1 = require("console");
const pepper = process.env.BCRYPT_PASSWORD;
const salt_rounds = process.env.SALT_ROUNDS;
class usersStore {
    // static authentication: any;
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = conn.query(sql);
            conn.release();
            return (await result).rows;
        }
        catch (err) {
            throw new Error(`could not get users :${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users(firstName,lastName,password_digest,username) VALUES($1,$2,$3,$4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, parseInt(salt_rounds));
            const result = await conn.query(sql, [u.firstName, u.lastName, hash, u.username]);
            const users = result.rows[0];
            conn.release();
            return users;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.firstName}}. Error:${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`connet get user ${err}`);
        }
    }
    async authentication(username, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from users where username=$1';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, result.rows[0].password_digest)) {
                    const userInfo = await conn.query(sql, [username]);
                    return userInfo.rows[0];
                }
            }
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`unable to login :${console_1.error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`can not delete user ${err}`);
        }
    }
}
exports.usersStore = usersStore;
