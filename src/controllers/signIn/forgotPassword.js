const UserModel = require('../../models/User');
const crypto = require('crypto');
const sendPasswordRecoveryEmail = require('../../config/mailerForgotPassword')

const forgotPassword = async (req, res) => {
   const {email} = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1)

    await UserModel.findByIdAndUpdate(user._id, {
        '$set':{
            passwordResetToken: token,
            passwordResetExpires: now
        }
    })
    await sendPasswordRecoveryEmail(user.email, user.name, token)
    res.status(200).json({status:'email was sent'})

  } catch (error) {
      res.status(404).json({error: 'error on forget password, try again'})
  }
}

module.exports = {forgotPassword} 





