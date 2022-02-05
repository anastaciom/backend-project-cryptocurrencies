
const request = require('supertest');
const mongoose = require('mongoose');
const UserModel = require('../../src/models/User');
const app = require('../../src/app');
const userFake = require('../userFake');

describe('SignUp Controller', () => {

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


    it('should create a new user and return status 201',async () => {

        const user = userFake

        const response = await request(app).post('/signup').send(user)
        expect(response.status).toBe(201);
    })

    it('should try to signup with invalid credentials and return error 422',async() => {

        const user = {
            name: undefined,
            // email: undefined,
            password: undefined
        }
        const response = await request(app).post('/signup').send(user)
        expect(response.status).toBe(422);
    })

    it('should be an existing user and return 401 error', async () => {

        const user = await UserModel.create(userFake)

        const searchUser = await UserModel.findOne({ email: user.email })
        if (!searchUser) {
            await UserModel.create(user)
        }

        const response = await request(app).post('/signup').send(user)
        expect(response.status).toBe(422);
    })
})