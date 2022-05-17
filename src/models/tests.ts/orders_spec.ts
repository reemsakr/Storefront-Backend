import db from '../../database';
import {user} from '../user_model';
import {product} from '../product_model';
import{ order} from '../order_model';
import {ordersStore} from '../order_model';
import {usersStore} from '../user_model';
import {productsStore} from '../product_model';

const userModel = new usersStore();
const productModel = new productsStore();
const orderModel = new ordersStore();

describe('Order Model', () => {
    describe('Test methods exist', () => {
        it('should have an index method', () => {
            expect(orderModel.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(orderModel.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(orderModel.create).toBeDefined();
        });

        it('should have a delete method', () => {
            expect(orderModel.delete).toBeDefined();
        });
    });

    describe('Test Model logic', () => {
        const user = {
            firstName: 'Test',
            lastName: 'User',
            password_digest: 'test123',
            username: 'testUser',
            
        } as user;

        const product = {
            name: 'product name',
            price: 20,
        } as product;

        const order = {
            product_id:1,
            quantity:2,
            user_id: 1,
            status: 'active'
        } as order;

        beforeAll(async () => {
            // setup user/product to test with
            await userModel.create(user);
            await productModel.create(product);
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql =
                'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
            await connection.query(sql);
            connection.release();
        });

        it('Create method should add an order', async () => {
            const createdOrder = await orderModel.create(order);
            expect(createdOrder.id).toEqual(1);
        });

        it('Index method should return a list of orders', async () => {
            const orders = await orderModel.index();
            expect(orders[0].id).toBe(1);
        });

        it('Show method should return the correct order', async () => {
            const returnedOrder = await orderModel.show("1");
            expect(returnedOrder.id).toEqual(1);
        });

        

        it('Delete method should remove the order', async () => {
            const deletedOrder = await orderModel.delete("1");
            expect(deletedOrder.id).toBe(1);
        });
    });
});