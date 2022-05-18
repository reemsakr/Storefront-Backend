import db from '../database';
import {order_product} from '../models/order_products_model';
import { order_productsStore } from '../models/order_products_model'; 
import {user} from '../models/user_model';
import {product} from '../models/product_model';
import{ order} from '../models/order_model';
import {ordersStore} from '../models/order_model';
import {usersStore} from '../models/user_model';
import {productsStore} from '../models/product_model';
import supertest from 'supertest';

import app from '../server';

import { Request,Response } from "express";
const request = supertest(app);
const userModel = new usersStore();
const productModel = new productsStore();
const orderModel = new ordersStore();
const orderProductModel = new order_productsStore();

describe('Order Product Model', () => {
    describe('Test methods exist', () => {
        it('should have an index method', () => {
            expect(orderProductModel.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(orderProductModel.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(orderProductModel.create).toBeDefined();
        });

        it('should have a delete method', () => {
            expect(orderProductModel.delete).toBeDefined();
        });
    });
});
    // describe('test Order Products Model logic', () => {
    //     const user = {
    //         firstName: 'Test',
    //         lastName: 'User',
    //         password_digest: 'test123',
    //         username: 'testUser'
    //     } as user;

    //     const product = {
    //         name: 'product name',    
    //         price:"9.99"
    //     } as product;

    //     const order = {
    //         product_id:1,
    //         quantity:2,
    //         user_id: 1,
    //         status: 'active'
    //     } as order;

    //     const orderProduct = {
    //         product_id: 1,
    //         order_id: 1,
    //         quantity: 1,
    //         price:20
            
    //     } as order_product;

    //     beforeAll(async () => {
    //         // setup user/product to test with
    //         await userModel.create(user);
    //         await productModel.create(product);
    //         await orderModel.create(order);
    //     });

    //     afterAll(async () => {
    //         const connection = await db.connect();
    //         const sql =
    //             'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    //         await connection.query(sql);
    //         connection.release();
    //     });

        // it('Create method should return an order product', async () => {
        //     const createdOrderProduct = await orderProductModel.create(orderProduct);
        //     expect(createdOrderProduct.quantity).toBe(1);
        // });
        

        // it('Delete method should remove products from list of product in order', async () => {
        //     const deletedOrderProduct = await orderProductModel.delete("1");
        //     expect(deletedOrderProduct.id).toBe(1);
        // });
    // });


