
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

    

        it('Authenticate method should return the authenticated user', async () => {
            const authenticatedUser = await users.authentication('Test', 'test123');
            if (authenticatedUser) {
            expect(authenticatedUser.firstName).toBe('Test');
                expect(authenticatedUser.lastName).toBe('User');
                expect(authenticatedUser.username).toBe('TestUser');
            
            }
        });

        it('Authenticate method should return null for wrong credentials', async () => {
            const authenticatedUser = await users.authentication('Test', 'test123');
            expect(authenticatedUser).toBe(null);
        });

    
    });
});


