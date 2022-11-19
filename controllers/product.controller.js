const Product = require('../models/product.model')

//validations
const validateProduct = require('../validations/product.validation')
//helpers
const joiHelper = require('../helpers/joi.helper')
const cloudinary = require('../helpers/cloudinary')
const buffer = require('../helpers/bufferConversion')

module.exports = {
  add: async (req, res) => {
    try {
      joiHelper(validateProduct, req.body)

      if (!req?.file?.mimitype)
        throw Error('please upload abaya image')

      const { secure_url } = await cloudinary(
        buffer(req?.file?.originalname, req?.file?.buffer)
      )
      req.body.image = secure_url
      await Product.create(req.body)
      res.status(201).json({ message: 'abaya added' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  fetch: async (req, res) => {
    try {
      const products = await Product.find({})
      if (!products.length) throw Error('no abaya available')
      res.status(200).json(products)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  fetchOne: async (req, res) => {
    try {
      const { productId } = req.params
      const product = await Product.findById(productId)
      if (!product) throw Error('abaya not found available')
      res.status(200).json({ product })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      const { productId } = req.params
      const product = await Product.deleteOne({ _id: productId })
      if (!product) throw Error('something went wrong')
      res
        .status(204)
        .json({ message: 'abaya deleted successfully' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
