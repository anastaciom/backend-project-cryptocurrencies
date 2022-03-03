const sendEMailForgotPassword = require('../createEmailForgotPassword');
const mongoose = require('mongoose');
const request = require('supertest');
const UserModel = require('../../src/models/User');
const app = require('../../src/app');
const crypto = require('crypto')

describe('Send email - Forget Password', () => {
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

    it("should send the user's valid email and the email with the token will be sent. Should return status 200", async () => {

        const user = await UserModel.create({
            name: 'Usertest6',
            email: 'usertest6@gmail.com',
            password: 'asddawwwdasd'
        })

        const userForgotPassword = {
            email: user.email
        }

        const userExists = await UserModel.findOne({email:userForgotPassword.email})
        if (userExists) {
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1)

            await UserModel.findByIdAndUpdate(userExists._id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })
            return await sendEMailForgotPassword('forgetPassword <forgetPassword@test.com>', userExists.email, userExists.name, token)
        }

        const response = await request(app).post('/signin/forgot_password').send(userForgotPassword)
        expect(response.status).toBe(200);
    })

    it("should send the user's invalid email and the email with the token will not be sent. Should return status 400", async ()=>{
    
        await UserModel.create({
            name: 'Usertest6',
            email: 'usertest6@gmail.com',
            password: 'asddawwwdasd'
        })

        const userForgotPassword = {
            email: 'testemailinvalid@gmail.com'
        }

        const userExists = await UserModel.findOne({email:userForgotPassword.email})
        if (userExists) {
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1)

            await UserModel.findByIdAndUpdate(userExists.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })
            return await sendEMailForgotPassword('forgetPassword <forgetPassword@test.com>', userExists.email, userExists.name, token)
        }

        const response = await request(app).post('/signin/forgot_password').send(userForgotPassword)
        expect(response.status).toBe(400);

    })


});
