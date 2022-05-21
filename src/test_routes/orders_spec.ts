import supertest from 'supertest';
import db from '../database';
import app from '../server';
import { usersStore } from '../models/user_model';
import { user } from '../models/user_model';

const userModel = new usersStore();
const request = supertest(app);
let token: string = '';

describe('Orders API Endpoints', () => {
  beforeAll(async () => {
    const user = {
      firstName: 'Test',
      lastName: 'User',
      password_digest: 'test123',
      username: 'testUser',
    } as user;

    await userModel.create(user);
  });

  afterAll(async () => {
    // clean db
    const connection = await db.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });

  describe('Test Authenticate method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authentication')
        .set('Content-type', 'application/json')
        .send({
          username: 'testUser',
          password_digest: 'test123',
        });
      expect(res.status).toBe(200);
      const { id, username, token: userToken } = res.body.data;
      expect(id).toBe(1);
      expect(username).toBe('testUser');
      token = userToken;
    });
  });
  describe('Test CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: 1,
          status: 'active'
        });
      expect(res.status).toBe(200);
      
    });

    it('should get list of orders', async () => {
      const res = await request
        .get('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      
    });

    it('should get order info', async () => {
      const res = await request
        .get('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    
    });

    it('should get order info for current user', async () => {
      const res = await request
        .get('/api/orders/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    
    });

    it('should update order info', async () => {
      const res = await request
        .patch('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          user_id: 1,
          status: 'active'
        });

      

      expect(res.status).toBe(404);
    
    });

    it('should delete order', async () => {
      const res = await request
        .delete('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    
    });
  });
});
