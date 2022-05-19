import {productsStore} from '../models/product_model';
import {product} from '../models/product_model';
import db from '../database';
import supertest from 'supertest';
import app from '../server';
import { Request,Response } from "express";
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

});
