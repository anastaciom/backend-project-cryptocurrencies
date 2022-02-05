const { createToken } = require('../../src/controllers/createToken')
const userFake = require('../userFake');
describe('JWT', () => {
    
    it('should create a JWT token for the user', () => {
        const user = userFake
        
        const tokenJWT = createToken({ id: user.id})
        expect(tokenJWT).toBeDefined()
    })
})