//npm
const bcrypt = require('bcryptjs')
//models
const User = require('../models/user.model')
const Product = require('../models/product.model')

//validatoins
const validateLogin = require('../validations/login.validation')
//helpers
const joiHelper = require('../helpers/joi.helper')
const jwtSign = require('../helpers/jwtSign.helper')

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body
      joiHelper(validateLogin, req.body)
      const admin = await User.findOne({ email })
      if (!admin) throw Error('invalid email')
      if (admin?.role !== 'admin')
        return res
          .status(403)
          .json({ message: 'access denaied' })
      if (!(await bcrypt.compare(password, admin.password)))
        throw Error('incorrect password')
      res.status(200).json({
        message: 'Login successfully',
        token: jwtSign({ id: admin.id, isAdmin: true }),
        user: {
          username: admin.username,
          email: admin.email,
          avatar: admin.avatar,
          contact: admin.contact,
          id: admin._id,
        },
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  fetchCustomers: async (req, res) => {
    try {
      const users = await User.find({
        orderPlaced: true,
      }).select('_id username avatar address')
      if (!users.length) throw Error('No Customers Available')
      res.status(200).json(users)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  upadteProduct: async (req, res) => {
    console.log(req.body)
    try {
      const product = await Product.findById(
        req.params.productId
      )
      product.price = req.body.price
      product.stock = req.body.stock
      await product.save()
      res.status(200).json({ message: 'Product Updated' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
