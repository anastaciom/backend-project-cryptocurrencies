const UserModel = require("../../models/User");
const admin = async (req, res) => {
  const user = await UserModel.findById(req.userId.id);
  if (!user) {
    res
      .status(401)
      .json({ message: `User does not exist or you are not admin` });
  } else {
    const isAdmin = user.isAdmin;
    if (isAdmin) {
     return res.status(200).json({ admin: "is true" });
    } 
    return  res.status(401).json({ message: `User does not exist or you are not admin` });
    
  }

  //get  all user
};

module.exports = { admin };
