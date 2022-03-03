
const sendMail = require('../createEmail');

describe('send email', () => {

    it('should send email when user is created', async () => {
        const user = {
            name: 'Test11',
            email: 'test11@1gmail.com',
            password: '1231145678'
        }
        const sendEmail = await sendMail('test <usertest@test.com>', user.email, user.name)
        expect(sendEmail).toBeDefined()
    })
});
