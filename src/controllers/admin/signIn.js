const UserModel = require("../../models/User");
const { decryptedPassword } = require("../passwordEncryption");
const { createToken } = require("../createToken");

const signInAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ error: `User does not exist or not administrator` });
    }
    const passwordAndUserMatch = await decryptedPassword(
      password,
      user.password
    );

    if (passwordAndUserMatch) {
      return res
        .status(200)
        .json({ user: user, token: createToken({ id: user._id }) });
    }

    return res.status(404).json({ error: "Email or password incorrect" });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error.` });
  }
};

module.exports = { signInAdmin };
