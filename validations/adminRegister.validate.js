const Joi = require('joi')
module.exports = function (admin) {
  const adminSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  })
  return adminSchema.validate(admin)
}
