
const userFake = require('../userFake');
const sendMail = require('../createEmail');

describe('send email', () => {

    it('should send email when user is created', async () => {
        const user = userFake
        const sendEmail = await sendMail('test <usertest@test.com>', user.email, user.name)
        expect(sendEmail).toBeDefined()
    })
});
