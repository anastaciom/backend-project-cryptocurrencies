const admin = async (req, res)=>{
    if(!req.userId.admin){
        return res.status(401).json({error: 'User does not exist or you are not admin'})
    }
    res.status(200).json({ admin: 'is true'})
    //get  all user
}

module.exports = {admin}