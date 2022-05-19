import { type } from 'os';
import Client from '../database';
//import bcrypt from 'bcrypt';
import { error } from 'console';

export type order_product = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
};

export class order_productsStore {
  // static authentication: any;

  async index(): Promise<order_product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_products';

      const result = conn.query(sql);
      conn.release();
      return (await result).rows;
    } catch (err) {
      throw new Error(`could not get products :${err}`);
    }
  }
  async create(p: order_product): Promise<order_product> {
    try {
      const conn = await Client.connect();

      const sql =
        'INSERT INTO order_products (order_id,product_id,quantity,price)VALUES ($1,$2,$3,$4) RETURNING *';

      const result = await conn.query(sql, [
        p.order_id,
        p.product_id,
        p.quantity,
        p.price,
      ]);

      conn.release();
      const product = result.rows[0];

      return product;
    } catch (err) {
      throw new Error(`connet get product ${err}`);
    }
  }

  async show(id: string): Promise<order_product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`connet get product ${err}`);
    }
  }

  async delete(id: string): Promise<order_product> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`can not delete product ${err}`);
    }
  }

  async update(p: order_product): Promise<order_product> {
    try {
      const conn = await Client.connect();

      const sql =
        'UPDATE order_products SET order_id=($2),product_id=($3) ,quantity=($4),price=($5) WHERE id=($1) RETURNING *';

      const result = await conn.query(sql, [
        p.id,
        p.order_id,
        p.product_id,
        p.quantity,
        p.price,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`can not update product ${err}`);
    }
  }
}
