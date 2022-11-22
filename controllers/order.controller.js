const Order = require('../models/order.model')

module.exports = {
  add: (req, res) => {
    Order.create({
      abayas: req.body,
      customer: req.user.id,
    })
      .then((result) =>
        res
          .status(201)
          .json({ message: 'your Order has been placed' })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message })
      )
  },
  get: (req, res) => {
    console.log(req.user.id)
    Order.find({ customer: req.user.id })
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
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
    customOrder: async (req, res) => {
      try {
      } catch (error) {
        res.status(400).json({ message: error.message })
      }
    }
  },
}
