import { type } from "os";
import Client from "../database";
//import bcrypt from 'bcrypt';
import { error } from "console";

export type product ={
    id : number;
    name:string;
    price:number;
}

export class productsStore{
    // static authentication: any;

    async index():Promise<product[]> {
        try{
            const conn = await Client.connect();
            const sql ='SELECT * FROM products';

            const result = conn.query(sql);
            conn.release();
            return  (await result).rows;
        }
        catch(err){
            throw new Error (`could not get products :${err}`);
        }
    }
    async create(p:product): Promise<product> {

        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name,price)VALUES ($1,$2) RETURNING *';
            const result = await  conn.query(sql,[p.name,p.price]);
            conn.release();
            const product=result.rows[0];
            
            return  product;
            

        } catch (err) {
            throw new Error(`connet get product ${err}`);
        }
    }

    async show(id: string): Promise<product> {

        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];

        } catch (err) {
            throw new Error(`connet get product ${err}`);
        }

    }
    
    async delete(id: string): Promise<product> {

        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            
            conn.release();
            
            return user;
        } catch (err) {
            throw new Error(`can not delete product ${err}`);
        }

    }
}


