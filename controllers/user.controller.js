//npm
const bcrypt = require('bcryptjs')
//models
const User = require('../models/user.model')
//validatoins
const validateLogin = require('../validations/login.validation')
const validateUser = require('../validations/userRegister.validate')
//helpers
const joiHelper = require('../helpers/joi.helper')
const jwtSign = require('../helpers/jwtSign.helper')
const cloudinary = require('../helpers/cloudinary')
const buffer = require('../helpers/bufferConversion')

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body
      joiHelper(validateLogin, req.body)
      const user = await User.findOne({ email })
      if (!user) throw Error('incorrect email')
      // if (!(await bcrypt.compare(password, user.password))) {
      //   throw Error('incorrect password')
      // }

      res.status(200).json({
        message: 'Login successfully',
        token: jwtSign({ id: user.id }),

        user: {
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  register: async (req, res) => {
    try {
      const { password, email } = req.body
      joiHelper(validateUser, req.body)
      if (!req?.file?.mimetype)
        throw Error('please upload profile image')

      const user = await User.findOne({ email })
      if (user) {
        throw Error('user already exists')
      }
      const { secure_url } = await cloudinary(
        buffer(req?.file?.originalname, req?.file?.buffer)
      )
      req.body.avatar = secure_url
      req.body.password = await bcrypt.hash(password, 10)
      await User.create(req.body)
      res.status(201).json({ message: 'Account created' })
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Something went Wrong',
      })
    }
  },
  order: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
