const request = require('supertest');
const mongoose = require('mongoose');
const UserModel = require('../../src/models/User');
const app = require('../../src/app');

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

    it('should create a new user and return status 201', () => {

       const user ={
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
});








