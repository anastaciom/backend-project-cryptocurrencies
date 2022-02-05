const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const UserModel = require('../../src/models/User');
const userFake = require('../userFake');
const {decryptedPassword, passEncryption} = require('../../src/controllers/passwordEncryption')

describe('SignIn Controller', () => {
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

    it('should sign in with credentials valid, and return 200 status', async () => {

        const user = await UserModel.create({
            name: 'test12',
            email: 'test12@test12.com',
            password: await passEncryption('123456')
        })
        const userLogin = {
            email: user.email,
            password: '123456'
        }
        const comparePassword = await decryptedPassword(userLogin.password, user.password)
        
        await request(app).post('/signin').send(userLogin)
        expect(comparePassword).toBe(true);

      
    })

    it('should sign in invalid password and return status 404', async () => {

        const user = await UserModel.create(userFake)

        const userLogin = {
            email: user.email,
            password: '123123123'
        }
       
        await UserModel.findOne({ email: userLogin.email })

        const response = await request(app).post('/signin').send(userLogin)
        expect(response.status).toBe(404);
    })


    it('should sign in invalid email and return status 404', async () => {

        const user = await UserModel.create(userFake)

        const userLogin = {
            email: 'test2@test2.com',
            password: user.password
        }
       
        await UserModel.findOne({ email: userLogin.email })

        const response = await request(app).post('/signin').send(userLogin)
        expect(response.status).toBe(404);

    })

})
