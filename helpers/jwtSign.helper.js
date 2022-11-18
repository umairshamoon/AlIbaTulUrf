const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
module.exports = function (payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: 7200,
  })
}
