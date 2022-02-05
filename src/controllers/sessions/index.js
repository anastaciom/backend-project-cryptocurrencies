const jwt = require('jsonwebtoken');

const sessions = async (req, res) => {
    res.json({user: 'ok'})
}


module.exports = { sessions }