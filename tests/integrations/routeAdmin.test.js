const { createToken } = require('../../src/controllers/createToken')
const app = require('../../src/app');
const request = require('supertest');
describe('Admin route', () => {

    it('should only accept administrators, and return status 200', async () => {
        const user = {
            id: '123123123',
            name: 'admin',
            email: 'admin1@gmail.com',
            password: 123123123,
            isAdmin: true
        }

        const response = await request(app).get('/admin').set('Authorization', `Bearer ${createToken({ id: user.id, admin: user.isAdmin })}`)
        expect(response.status).toBe(200);


    })

    it('should deny system users and return 401 status', async () => {
        const user2 = {
            id: '1231231231313',
            name: 'admin2',
            email: 'admin2@gmail.com',
            password: 123123123,
            isAdmin: false
        }

        const response = await request(app).get('/admin').set('Authorization', `Bearer ${createToken({ id: user2.id, admin: user2.isAdmin })}`)
        expect(response.status).toBe(401);
    })
})