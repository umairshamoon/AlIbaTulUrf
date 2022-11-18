const Joi = require('joi')
module.exports = function (data) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  })
  return loginSchema.validate(data)
}
