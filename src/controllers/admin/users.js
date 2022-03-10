const UserModel = require("../../models/User");
const allUsers = async (req, res) => {
  const user = await UserModel.findById(req.userId.id);

  try {
    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ error: `User does not exist or you are not admin` });
    }

    const allUsers = await UserModel.find(
      {},
      { _id: 0, password: 0, updatedAt: 0, __v: 0 }
    );
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: `Internal server error.` });
  }
};

module.exports = { allUsers };
