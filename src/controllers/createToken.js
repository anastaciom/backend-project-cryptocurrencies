const jwt = require('jsonwebtoken');
const { secret } = require('../config/authSecret')

function createToken(user) {
  return jwt.sign(user, secret, {
    expiresIn: 86400
  })
}

module.exports = { createToken }