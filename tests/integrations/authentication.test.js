const request = require('supertest');
const mongoose = require('mongoose');
const UserModel = require('../../src/models/User');
const app = require('../../src/app');

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

    it('should create a new user and return status 201', () => {

        const user = {
            name: 'Anastacio',
            email: 'test1@testt2.com',
            password: 'asdasdasdas'
        }
        return request(app).post('/signup')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(201).then((res) => {
                expect(res.body.name).toEqual(user.name)
                expect(res.body.email).toEqual(user.email)
                expect(res.body.password).toEqual(user.password)
                expect(res.body._id).toBeDefined()
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
            .expect('Content-Type', /json/)
            .expect(422).then((res) => {
                expect(res.body.name).toBeUndefined()
                expect(res.body.email).toBeUndefined()
                expect(res.body.password).toBeUndefined()
            });
    })

    it('should be an existing user and return 401 error', async () => {

        const user = {
            name: 'Anastacio2',
            email: 'test1@test1',
            password: '1223675'
        }
        
        const searchUser = await UserModel.findOne({ email: user.email })
        if (!searchUser) {
            await UserModel.create(user)
        }
        const response = await request(app).post('/signup').send(user)
        expect(response.status).toBe(401)
    })

})







