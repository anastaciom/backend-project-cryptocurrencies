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
        await sendEmail(newUser.email, newUser.name)
        return res.status(201).json({user:newUser, token: createToken({id:newUser._id, admin: newUser.isAdmin})})
    } catch (error) {
        return res.status(422).json({ error: `Internal server error.` })
    }
}


module.exports = { signUp }