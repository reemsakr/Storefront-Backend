import { type } from 'os';
import Client from '../database';
import bcrypt from 'bcrypt';
import { error } from 'console';
export type user = {
  id: number;
  firstName: string;
  lastName: string;
  password_digest: string;
  username: string;
};
const pepper = process.env.BCRYPT_PASSWORD as string;
const salt_rounds = process.env.SALT_ROUNDS as string;
export class usersStore {
  async index(): Promise<user[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = conn.query(sql);
      conn.release();
      return (await result).rows;
    } catch (err) {
      throw new Error(`could not get users :${err}`);
    }
  }
  async create(u: user): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users(firstName,lastName,password_digest,username) VALUES($1,$2,$3,$4) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(salt_rounds)
      );
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        hash,
        u.username,
      ]);
      const users = result.rows[0];
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstName}}. Error:${err}`);
    }
  }

  async show(id: string): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`connet get user ${err}`);
    }
  }

  async authentication(
    username: string,
    password: string
  ): Promise<user | null> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from users where username=$1';
      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];

        if (
          bcrypt.compareSync(password + pepper, result.rows[0].password_digest)
        ) {
          const userInfo = await conn.query(sql, [username]);
          return userInfo.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`unable to login :${error}`);
    }
  }

  async delete(id: string): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`can not delete user ${err}`);
    }
  }
  async update(u: user): Promise<user> {
    try {
      const conn = await Client.connect();

      const sql =
        'UPDATE users SET firstName=($2) ,lastName=($3),password_digest=($4),username=($5) WHERE id=($1) RETURNING *';

      const result = await conn.query(sql, [
        u.id,
        u.firstName,
        u.lastName,
        u.password_digest,
        u.username,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`can not update user ${err}`);
    }
  }
}
