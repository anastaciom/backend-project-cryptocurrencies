const request = require('supertest');
const mongoose = require('mongoose');
const { createToken } = require('../../src/controllers/createToken')
const UserModel = require('../../src/models/User');
const userFake = require('../userFake')
const app = require('../../src/app');


describe('private routes', ()=>{
    beforeAll(async () => {
        if (!process.env.MONGO_URL) {
            throw new Error('MongoDB server not initialized')
        };
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (err) => {
            if (err) {
                console.error(err)
            }
        })
    });
    beforeEach(async () => {
        await UserModel.deleteMany({})
    })
    afterAll(async () => {
        await mongoose.connection.close();
    });
    
    it('should check if user has access token and return status 200', async()=>{
        const user = await UserModel.create(userFake)
       const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${createToken({id: user._id})}`)
       
        expect(response.status).toBe(200);
    })

    it('should not be able to access private routes with invalid JWT token', async()=>{
       const response = await request(app).get('/dashboard').set('Authorization', `Bearer 123123123`)
        expect(response.status).toBe(401);
    })

    it('should not be able to access private routes when not authenticated', async()=>{
       const response = await request(app).get('/dashboard')
        expect(response.status).toBe(401);
    })

    it('should check if before the token has "Bearer"', async()=>{
        const user = await UserModel.create(userFake)
        const response = await request(app).get('/dashboard').set('Authorization', `${createToken({id: user._id})}`)
        expect(response.status).toBe(401);
     })

     it('should check if before the token there is "Bearer" + token', async()=>{
        const user = await UserModel.create(userFake)
        const response = await request(app).get('/dashboard').set('Authorization', '')
        expect(response.status).toBe(401);
     })
})