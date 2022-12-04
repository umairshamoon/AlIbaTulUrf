const Joi = require('joi')
module.exports = function (user) {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    contact: Joi.string().length(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  })
  return userSchema.validate(user)
}
