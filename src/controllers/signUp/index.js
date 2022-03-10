const UserModel = require("../../models/User");
const { passEncryption } = require("../passwordEncryption");
const { createToken } = require("../createToken");
const sendEmail = require("../../config/mailer");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name.length < 3) {
      return res.status(404).json({ error: "Name minimum is 3 characters" });
    }
    if (email.length < 4) {
      return res.status(404).json({ error: "Email minimum is 4 characters" });
    }
    if (password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password minimum is 6 characters" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(401).json({ error: "User already exists." });
    }

    const newUser = await UserModel.create({
      name,
      email,
      password: await passEncryption(password),
    });

    await sendEmail(newUser.email, newUser.name);
    return res
      .status(201)
      .json({ user: newUser, token: createToken({ id: newUser._id }) });
  } catch (error) {
    return res.status(422).json({ error: `Internal server error.` });
  }
};

module.exports = { signUp };
