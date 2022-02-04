const UserModel = require('../../models/User');
const {decryptedPassword} = require('../passwordEncryption')

const signIn = async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: `User does not exist` })
        }
        const passwordAndUserMatch = await decryptedPassword(password, user.password)
        if (passwordAndUserMatch) {
            return res.status(200).json(user)
        }
        return res.status(404).json({ error: 'Email or password incorrect' })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Internal server error.` })
    }

}


module.exports = { signIn }