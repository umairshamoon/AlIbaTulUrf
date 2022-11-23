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
      abayas: req.body.cart,
      customer: req.user.id,
      shipping_address: req.body.address,
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
    let query = { order_type: 'shop' }
    if (!req.user.isAdmin)
      query = { ...query, customer: req.user.id }
    Order.find(query)
      .populate('customer', '-password -__v -role')
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
      const { response, message = 'sorry' } = req.body

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
      const {
        discription,
        name,
        color,
        pearls,
        scarf,
        address,
        length,
        width,
        quantity,
      } = req.body
      const { id } = req.user
      // joiHelper(validateProduct, req.body)
      if (req.file) {
        const { secure_url } = await cloudinary(
          buffer(req?.file?.originalname, req?.file?.buffer)
        )
        req.body.image = secure_url
      } else
        req.body.image =
          'https://cdn1.vectorstock.com/i/1000x1000/58/05/no-image-icon-available-picture-symbol-vector-35475805.jpg'
      req.body.postedBy = id
      const { _id } = await Product.create({
        discription,
        name,
        color,
        pearls,
        scarf,
        image: 'NA',
        price: 1,
        shipping_address: address,
        length,
        width,
      })
      await Order.create({
        abayas: [{ details: _id, quantity }],
        customer: id,
        shipping_address: address,
        order_type: 'custom',
      })
      res
        .status(201)
        .json({ message: 'your Order has been placed' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  fetchCustom: async (req, res) => {
    try {
      const orders = await Order.find({
        order_type: 'custom',
        status: 'pending',
      })
        .populate('customer', '-password -__v -role')
        .populate('abayas.details', '-_id -__v')
      if (!orders.length) throw Error('no custom orders')
      res.status(200).json(orders)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  fetchRespondedOrders: async (req, res) => {
    try {
      const { status } = req.query

      const orders = await Order.find({ status })
        .populate('customer', '-password -__v -role')
        .populate('abayas.details', '-_id -__v')

      if (!orders.length) throw Error('no custom orders')
      res.status(200).json(orders)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
