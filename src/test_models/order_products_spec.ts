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
    