const UserModel = require("../../models/User");
const { passEncryption } = require("../passwordEncryption");
const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (token !== user.passwordResetToken) {
      return res.status(401).json({ error: "Token invalid" });
    }

    const now = new Date();
    if (now > user.passwordResetExpires) {
      return res
        .status(401)
        .json({ error: "Token expires, generate a new one" });
    }

    if (password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password minimum is 6 characters" });
    }

    user.password = await passEncryption(password);

    await user.save();
    res.status(200).json({ status: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ error: "Cannot reset password, try again." });
  }
};

module.exports = { resetPassword };
