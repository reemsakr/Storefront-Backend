import supertest from 'supertest';
import db from '../database';
import {usersStore} from '../models/user_model';
import {user} from '../models/user_model';
import app from '../server';

import { Request,Response } from "express";

const userModel = new usersStore();
const request = supertest(app);
let token: string = '';

describe('User API Endpoints', () => {
    beforeAll(async () => {
        const user = {
        firstName: 'Test',
            lastName: 'User',
            password_digest: 'test123',
            username: 'testUser' 
        } as user;

        await userModel.create(user);
    });
    afterAll(async () => {
        // clean db
        const connection = await db.connect();
        const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
        await connection.query(sql);
        connection.release();
    });
    describe('Test Authenticate method', () => {
        it('should be able to authenticate to get token', async () => {
            const res = await request
                .post('/api/users/authentication')
                .set('Content-type', 'application/json')
                .send({
                    userName: 'testUser',
                    password_digest: 'test123'
                });
            expect(res.status).toBe(200);
            const { id, username, token: userToken } = res.body.data;
            expect(id).toBe(1);
            expect(username).toBe('testUser');
            token = userToken;
        });
    });

    describe('Test CRUD API methods', () => {
        it('should create new user', async () => {
            const res = await request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'Test2',
            lastName: 'User2',
            password_digest: 'test123',
            username: 'testUser2' 
                });
            expect(res.status).toBe(200);
            const { id, firstName, lastName,username} = res.body.data;
            expect(id).toBe(2);
            expect(firstName).toBe('Test2');
            expect(lastName).toBe('User2');
            expect(username).toBe('testUser2');
            
        });

        it('should delete user', async () => {
            const res = await request
                .delete('/api/users/2')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user.id).toBe(2);
            expect(res.body.data.user.username).toBe('testUser2');
        });

        it('should get list of users', async () => {
            const res = await request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.users.length).toBe(1);
        });

        it('should get user info', async () => {
            const res = await request
                .get('/api/users/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user.username).toBe('testUser');
            
        });

        it('should update user info', async () => {
            const res = await request
                .put('/api/users/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id: 1,
                    firstName: 'Test',
                    lastName: 'User',
                    password_digest: 'test123',
                    username: 'testUser' 
                });
            expect(res.status).toBe(200);

            const { id,   firstName, lastName, username} = res.body.data.user;
            expect(id).toBe(1);
            expect(firstName).toBe('Test');
            expect(lastName).toBe('User');
            expect(username).toBe('testUser');
        
        });
    });
});


// console.log("///");
// describe('to test endpoint response', () => {
//     it('get the api endpoint', async () => {
//     const response = await request.get('/api/users');
//     expect(response.status).toBe(200);
//     });});