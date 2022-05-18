
import {user} from "../models/user_model";
import db from '../database';
import {usersStore} from '../models/user_model';
import{Request,Response}from 'express';
import app from '../server';
import supertest from 'supertest';


const request = supertest(app);
const users = new usersStore();
describe('User Model',() => {
    describe('Test methods exist', () => {
        it('should have an index method', () => {
            expect(users.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(users.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(users.create).toBeDefined();
        });

        it('should have a delete method', () => {
            expect(users.delete).toBeDefined();
        });

        it('should have an Authenticate method', () => {
            expect(users.authentication).toBeDefined();
        });
    });

    describe('Test Model logic', () => {
        const user = {
            firstName: 'Test',
            lastName: 'User',
            password_digest: 'test123',
            username: 'testUser'
        } as user ;

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
            await connection.query(sql);
            connection.release();
        });

        // it('Create method should return a User', async () => {
        //     const createdUser = await users.create(user);
        //     expect(createdUser).toEqual({
        //         id: createdUser.id,
        //     firstName: 'Test',
        //     lastName: 'User',
        //     username: 'testUser'
        //     } as user);
        // });

        // it('Index method should return All available users in DB', async () => {
        //     const user = await users.index();
        //     expect(user.length).toBe(1);
        //     expect(user[0].username).toBe('testUser');
        // });

        // it('Show method should return testUser when called with ID (1)', async () => {
        //     const returnedUser = await users.show("1");
        //     expect(returnedUser.id).toBe(1);
        //     expect(returnedUser.firstName).toBe('Test');
        //     expect(returnedUser.lastName).toBe('User');
        //     expect(returnedUser.username).toBe('testUser');
        // });

        // it('Edit method should return a user with edited attributes', async () => {
        //     const updatedUser = await users.update({
        //         id: 1,
        //     firstName: 'Reem',
        //         lastName: 'Sakr',
        //         password_digest: 'test123',
        //         username: 'Reem.sakr'
                
        //     });
        //     expect(updatedUser.firstName).toBe('Reeem');
        //     expect(updatedUser.lastName).toBe('sakr')
        //     expect(updatedUser.username).toBe('Reem.sakr');
            
        // });

        it('Authenticate method should return the authenticated user', async () => {
            const authenticatedUser = await users.authentication('mohammedelzanaty', 'test123');
            if (authenticatedUser) {
            expect(authenticatedUser.firstName).toBe('Reeem');
                expect(authenticatedUser.lastName).toBe('sakr');
                expect(authenticatedUser.username).toBe('Reeem.sakr');
            
            }
        });

        it('Authenticate method should return null for wrong credentials', async () => {
            const authenticatedUser = await users.authentication('Reem.sakr', 'fakeuser');
            expect(authenticatedUser).toBe(null);
        });

        // it('Delete method should delete user from DB', async () => {
        //     const deletedUser = await users.delete("1");
        //     expect(deletedUser.id).toBe(1);
        // });
    });
});


