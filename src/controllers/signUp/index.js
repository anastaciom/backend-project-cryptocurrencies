const UserModel = require('../../models/User');
const {passEncryption} = require('../passwordEncryption')
const {createToken} = require('../createToken')
const sendEmail = require('../../config/mailer')

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(401).json({ error: `User ${email} already exists.` });
        }
        const newUser = await UserModel.create({ name, email, password: await passEncryption(password) })
       return res.status(201).json({user:newUser, token: createToken({id:newUser._id})})
        // return await sendMail('test 2 <usertest2@gmail.com>', newUser.email, newUser.name)
    } catch (error) {
        return res.status(422).json({ error: `Internal server error.` })
    }
}


module.exports = { signUp }