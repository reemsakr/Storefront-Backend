import {productsStore} from '../product_model';
import {product} from '../product_model';
import db from '../../database';

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
            
            price: 9.99,
            
        } as product ;

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
            await connection.query(sql);
            connection.release();
        });

        it('Create method should add a product', async () => {
            const createdProduct = await products.create(product);
            expect(createdProduct).toEqual({
                id: createdProduct.id,
                name:createdProduct.name,
                price: createdProduct.price
            });
        });

        it('Index method should return a list of products', async () => {
            const product= await products.index();
            expect(product.length).toBe(1);
            expect(product[0].name).toBe('product name');
        });

        it('Show method should return the correct product', async () => {
            const returnedProduct = await products.show("1");
            expect(returnedProduct).toEqual({
                id: returnedProduct.id,
                name:returnedProduct.name,
                price: returnedProduct.price
            });
        });

        it('Edit method should return a product with edited attributes', async () => {
            const returnedProduct = await products.update({
                id: 1,
                name: 'product name edited',
                price: 10,
            });
            expect(returnedProduct.name).toBe('product name edited');
        
        });

        it('Delete method should remove the product', async () => {
            const deletedProduct = await products.delete("1");
            expect(deletedProduct.id).toBe(1);
        });
    });
});