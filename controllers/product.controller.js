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

      if (!req?.file?.mimetype)
        throw Error('please upload abaya image')

      const { secure_url } = await cloudinary(
        buffer(req?.file?.originalname, req?.file?.buffer)
      )
      req.body.image = secure_url
      req.body.postedBy = req.user.id
      await Product.create(req.body)
      res.status(201).json({ message: 'abaya added' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  fetch: async (req, res) => {
    try {
      const products = await Product.find({
        postedBy: '6384b49266bc45f42ae52370',
      }).populate('postedBy', 'username avatar contact _id')
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
  fetchQuery: async (req, res) => {
    try {
      const products = await Product.find(req.query)
      if (!products.length)
        throw Error('no data against query exists')
      res.status(200).json(products)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  },
}
