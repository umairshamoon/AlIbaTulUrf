const Joi = require('joi')
module.exports = function (product) {
  const productSchema = Joi.object({
    color: Joi.string().required(),
    name: Joi.string().required(),
    pearls: Joi.boolean().default(false),
    scarf: Joi.boolean().default(false),
    length: Joi.number().min(1).required(),
    width: Joi.number().min(1).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(1).required(),
    discription: Joi.string().required(),
  })
  return productSchema.validate(product)
}
