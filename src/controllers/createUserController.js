const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(401).json({ error: `User ${email} already exists.` });
        }
        const newUser = await UserModel.create({ name, email, password })
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(422).json({ error: `Internal server error.` })
    }
}


module.exports = { signUp }