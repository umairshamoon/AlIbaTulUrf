const Order = require('../models/order.model')
const Product = require('../models/product.model')
// helpers
const joiHelper = require('../helpers/joi.helper')
const buffer = require('../helpers/bufferConversion')
const cloudinary = require('../helpers/cloudinary')
// valiations
const validateProduct = require('../validations/product.validation')
module.exports = {
  add: (req, res) => {
    Order.create({
      abayas: req.body,
      customer: req.user.id,
    })
      .then((r) =>
        res
          .status(201)
          .json({ message: 'your Order has been placed' })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message })
      )
  },
  get: (req, res) => {
    let query = {}
    if (!req.user.isAdmin) query = { customer: req.user.id }
    Order.find(query)
      .populate('customer', '-password -_id -__v -role')
      .populate('abayas.details', '-_id -__v')
      .then((orders) => {
        if (!orders.length) throw Error('no order available')
        res.status(200).json(orders)
      })
      .catch((err) =>
        res.status(404).json({ message: err.message })
      )
  },
  respondOrder: async (req, res) => {
    try {
      const { response, message } = req.body
      const { orderId } = req.params
      if (!message)
        throw Error('Please enter your response message')
      const order = await Order.findById(orderId)
      order.message = message
      if (response) order.status = 'approved'
      else order.status = 'rejected'
      await order.save()
      res.status(200).json({ message: 'Order updated' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  customOrder: async (req, res) => {
    try {
      req.body.price = 5
      const { id } = req.user
      joiHelper(validateProduct, req.body)
      if (req.file) {
        const { secure_url } = await cloudinary(
          buffer(req?.file?.originalname, req?.file?.buffer)
        )
        req.body.image = secure_url
      } else req.body.image = 'NA'
      req.body.postedBy = id
      const { _id } = await Product.create(req.body)
      await Order.create({
        abayas: [_id],
        customer: id,
      })
      res
        .status(201)
        .json({ message: 'your Order has been placed' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
