import supertest from 'supertest';
import db from '../database';
import app from '../server';
import {usersStore} from '../models/user_model';
import {user} from '../models/user_model';
import {order_product} from '../models/order_products_model';
import {order} from '../models/order_model';
import {product} from '../models/product_model';
import {productsStore} from '../models/product_model';
import {ordersStore} from '../models/order_model';

const userModel = new usersStore();
const productModel = new productsStore();
const orderModel = new ordersStore();
const request = supertest(app);
let token: string = '';

describe('Order Product API Endpoints', () => {
    const user = {
        firstName: 'Test',
        lastName: 'User',
        password_digest: 'test123',
        username: 'testUser'
        
    } as user;

    const product = {
        name: 'product name',
        price: 9
    } as product;

    const order = {
        product_id:1,
        quantity:2,
        user_id: 1,
        status: 'active'
    } as order;

    const orderProduct = {
        order_id: 1,
        product_id: 1,
        quantity: 1,
    price:20
    
    } as order_product;

    beforeAll(async () => {
        // setup user/product to test with
        await userModel.create(user);
        await productModel.create(product);
        await orderModel.create(order);
    });

    afterAll(async () => {
        const connection = await db.connect();
        const sql =
            'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
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
                    password_digest: 'test123'
                });
            expect(res.status).toBe(200);
            const { id, username, token: userToken } = res.body.data;
            expect(id).toBe(1);
            expect(username).toBe('testUser');
            token = userToken;
        });
    });

    // describe('Test CRUD API methods', () => {
    //     it('should create new order product', async () => {
    //         const res = await request
    //             .post('/api/order-products/1')
    //             .set('Content-type', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send(orderProduct);
    //         expect(res.status).toBe(200);
    //         const { id, order_id,product_id,quantity,price} = res.body.data;
    //         expect(id).toBe(1);
    //         expect(quantity).toBe(1);
    //         expect(order_id).toBe(1);
    //         expect(product_id).toBe(1);
    //     });

    //     it('should get list of order products', async () => {
    //         const res = await request
    //             .get('/api/order-products/1')
    //             .set('Content-type', 'application/json')
    //             .set('Authorization', `Bearer ${token}`);
    //         expect(res.status).toBe(200);
    //         expect(res.body.data.orderProducts.length).toBe(1);
    //     });

    //     it('should get order product info', async () => {
    //         const res = await request
    //             .get('/api/order-products/1/products/1')
    //             .set('Content-type', 'application/json')
    //             .set('Authorization', `Bearer ${token}`);
    //         expect(res.status).toBe(200);
    //     });

    //     it('should update order product info', async () => {
    //         const res = await request
    //             .get('/api/order-products/1')
    //             .set('Content-type', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send({
    //                 id: 1,
    //                 order_id:1,
    //                 product_id:1,
    //                 quantity: 2,
    //                 price:20
    //             });
    //         const {id, order_id,product_id,quantity,price} = res.body.data.orderProduct;

    //         expect(res.status).toBe(200);
    //         expect(id).toBe(1);
    //         expect(product_id).toBe(1);
    //         expect(order_id).toBe(1);
    //         expect(quantity).toBe(1);
    //     });

    //     it('should delete order', async () => {
    //         const res = await request
    //             .delete('/api/order-products/1')
    //             .set('Content-type', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
                
    //         expect(res.status).toBe(200);
    //         expect(res.body.data.orderProduct.id).toBe(1);
    //     });
    // });
});