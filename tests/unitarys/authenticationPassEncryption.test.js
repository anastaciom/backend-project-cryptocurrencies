//sign up
const bcrypt = require('bcryptjs')
const UserModel = require("../../src/models/User")
const mongoose = require('mongoose')

describe('sign up Controller', ()=>{

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

    it('should encrypt user password', async()=>{
        const user = await UserModel.create({
            name: 'test',
            email: 'test@test.com',
            password: '123456'
        })
        const createEncryptedPassword = await bcrypt.hash(user.password, 10)
        expect(createEncryptedPassword).toBeDefined()
    })
})

