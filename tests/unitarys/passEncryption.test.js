const {passEncryption, decryptedPassword} = require('../../src/controllers/passwordEncryption')

describe('password encryption', () => {
   
    it('should encrypt user password', async() => {
        const user ={
            name: 'test6',
            email: 'test6@test6.com',
            password: '12345678'
        }
        const createEncryptedPassword = await passEncryption(user.password)
        expect(createEncryptedPassword).toBeDefined()
    })

    it('should compare password and return true', async()=>{
        
        const userDB = {
            id: '1231234',
            name: 'test7',
            email: 'test7@test7.com',
            password: await passEncryption('123456890')
        }

        const userLogin ={
            email: userDB.email,
            password: '123456890'
        }

        const comparePassword = await decryptedPassword(userLogin.password, userDB.password)
        expect(comparePassword).toBe(true)
    })

    it('should compare password and return false', async()=>{
        
        const userDB = {
            id: '1231234',
            name: 'test7',
            email: 'test7@test7.com',
            password: await passEncryption('123456890')
        }

        const userLogin ={
            email: userDB.email,
            password: 'test121212'
        }

        const comparePassword = await decryptedPassword(userLogin.password, userDB.password)
        expect(comparePassword).toBe(false)
    })
})

