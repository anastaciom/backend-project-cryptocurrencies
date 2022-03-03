const { createToken } = require('../../src/controllers/createToken')
describe('JWT', () => {
    
    it('should create a JWT token for the user', () => {
        const user = {
            name: 'Test12311',
            email: 'test1231112@gmail.com',
            password: '1234567238'
        }
        
        const tokenJWT = createToken({ id: user.id, admin: user.isAdmin})
        expect(tokenJWT).toBeDefined()
    })
})