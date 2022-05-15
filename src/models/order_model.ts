import { type } from "os";
import Client from "../database";
//import bcrypt from 'bcrypt';
import { error } from "console";
import _ from 'lodash';

export type order ={
    id : number;
    product_id:number;
    quantity:number;
    user_id:number;
    status:string;
}

export class ordersStore{
    // static authentication: any;

    async index():Promise<order[]> {
        try{
            const conn = await Client.connect();
            const sql ='SELECT * FROM orders';

            const result = conn.query(sql);
            conn.release();
            return  (await result).rows;
        }
        catch(err){
            throw new Error (`could not get orders :${err}`);
        }
    }
    async create(o:order): Promise<order> {

        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (product_id,quantity,user_id,status)VALUES ($1,$2,$3,$4) RETURNING *';
            const result = await  conn.query(sql,[o.product_id,o.quantity,o.user_id,o.status]);
            conn.release();
            const product=result.rows[0];
            
            return  product;
            

        } catch (err) {
            throw new Error(`can not  get product ${err}`);
        }
    }

    async show(user_id: string): Promise<order[]> {

        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            const result = await conn.query(sql, [user_id]);
            conn.release();
            
            return result.rows;

        } catch (err) {
            throw new Error(`can not get order ${err}`);
        }

    }
    async delete(id: string): Promise<order> {

        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            
            conn.release();
            
            return user;
        } catch (err) {
            throw new Error(`can not order user ${err}`);
        }

    }
}


