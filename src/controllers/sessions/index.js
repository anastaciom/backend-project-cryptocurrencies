
const sessions = async (req, res) => {
    res.json({autorization: 'ok', userAuth: req.userId})
    //api run
}


module.exports = { sessions }