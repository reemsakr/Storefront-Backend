import { productsStore } from '../models/product_model';
import { product } from '../models/product_model';
import db from '../database';
import supertest from 'supertest';
import app from '../server';
import { Request, Response } from 'express';
const request = supertest(app);
const products = new productsStore();

describe('Product Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(products.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(products.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(products.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(products.delete).toBeDefined();
    });
  });
  describe('Test Model logic', () => {
    const product = {
      name: 'product name',
      price: 9.99
    } as product;

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
      await connection.query(sql);
      connection.release();
    });

    it('Index method should return a list of products', async () => {
      const product= await products.index();
      expect(product.length).toBe(0);
      
    });

    

    
    
  });
});
