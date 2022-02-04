const request = require('supertest');
const mongoose = require('mongoose');
const UserModel = require('../../src/models/User');
const app = require('../../src/app');
const bcrypt = require('bcryptjs');

describe('Authentication', () => {
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

    describe('SignUp Controller', () => {

        it('should create a new user and return status 201', () => {

            const user = {
                name: 'test',
                email: 'test@test.com',
                password: '123456'
            }
            return request(app).post('/signup')
                .send(user)
                .expect(201).then((res) => {
                    expect(res.body.email).toEqual(user.email)
                })
        })

        it('should try to signup with invalid credentials and return error 422', () => {

            const user = {
                name: '',
                email: '',
                password: ''
            }
            return request(app).post('/signup')
                .send(user)
                .expect(422).then((res) => {
                    expect(res.body.name).toBeUndefined()
                    expect(res.body.email).toBeUndefined()
                    expect(res.body.password).toBeUndefined()
                });
        })

        it('should be an existing user and return 401 error', async () => {

            const user = {
                name: 'test',
                email: 'test@test.com',
                password: '123456'
            }

            const searchUser = await UserModel.findOne({ email: user.email })
            if (!searchUser) {
                await UserModel.create(user)
            }
            const response = await request(app).post('/signup').send(user)
            expect(response.status).toBe(401)
        })
    })


    describe('SignIn Controller', () => {

        it('should sign in with credentials valid, and return 200 status', async () => {

            const user = await UserModel.create({
                name: 'test',
                email: 'test@test.com',
                password: await bcrypt.hash('123456', 10)
            })
            const userLogin = {
                email: user.email,
                password: '123456'
            }
            const comparePassword = await bcrypt.compare(userLogin.password, user.password)

            await request(app).post('/signin').send(userLogin)
            expect(comparePassword).toBe(true);
        })

        it('should sign in invalid password and return status 404', async () => {

            const user = await UserModel.create({
                name: 'test',
                email: 'test@test.com',
                password: await bcrypt.hash('123456', 10)
            })
            const userLogin = {
                email: user.email,
                password: 'testError'
            }
            const comparePassword = await bcrypt.compare(userLogin.password, user.password)

            await request(app).post('/signin').send(userLogin)
            expect(comparePassword).toBe(false);
        })

        it('should sign in invalid email and return status 404', async () => {
            const user = await UserModel.create({
                name: 'test',
                email: 'test@test.com',
                password: await bcrypt.hash('123456', 10)
            })
            const userLogin = {
                email: 'test2@test2.com',
                password: '123456'
            }

            await bcrypt.compare(userLogin.password, user.password)
            const verifyEmail = await UserModel.findOne({ email: userLogin.email })

            await request(app).post('/signin').send(userLogin)
            expect(verifyEmail).toBe(null);

        })
    })

})
