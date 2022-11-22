const Cart = require('../models/cart.model')

module.exports = {
  add: (req, res) => {
    req.body.customer = req.user.id
    Cart.create(req.body)
      .then((result) =>
        res.status(201).json({ message: 'cart saved' })
      )
      .catch((err) =>
        res.status(400).json({ message: err.message })
      )
  },
  get: (req, res) => {
    Cart.find({ customer: req.user.id })
      .populate('customer', '-password -_id -__v -role')
      .populate('abayas.details', '-_id -__v -role')
      .populate('abayas.details.postedBy')
      .then((cart) => res.status(200).json(cart))
      .catch((err) =>
        res.status(400).json({ message: err.message })
      )
  },
}
