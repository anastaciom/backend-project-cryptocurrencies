
const sessions = async (req, res) => {
    res.json({autorization: 'ok', userAuth: req.userId})
}


module.exports = { sessions }