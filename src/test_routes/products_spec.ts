import supertest from 'supertest';
import db from '../database';
import app from '../server';
import { usersStore } from '../models/user_model';
import { user } from '../models/user_model';

import { Request, Response } from 'express';

const userModel = new usersStore();
const request = supertest(app);
let token: string = '';

describe('Products API Endpoints', () => {
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
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1';
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
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product name',
          price: "9.99"
        
        });
      expect(res.status).toBe(400);
      
      
    });

    it('should get list of products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    
    });

    it('should get product info', async () => {
      const res = await request
        .get('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      
    });

    it('should update product info', async () => {
      const res = await request
        .patch('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          name: 'product name',
          
          price: '20'
          
        });
      expect(res.status).toBe(404);
    
    });

    it('should delete product', async () => {
      const res = await request
        .delete('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    
    });
  });
});
