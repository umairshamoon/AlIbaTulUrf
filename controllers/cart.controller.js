const Cart = require('../models/cart.model')

module.exports = {
  add: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
