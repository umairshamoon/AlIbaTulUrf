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

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body

      if (joiHelper(validateLogin, req.body)?.statusCode) return

      const user = await User.findOne({ email })
      if (!user)
        return res
          .status(404)
          .json({ message: 'incorrect email' })

      if (!(await bcrypt.compare(password, user.password)))
        return res
          .status(400)
          .json({ message: 'Incorrect Password' })

      res.status(200).json({
        message: 'Login successfully',
        token: jwtSign({ id: user.id }),
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  register: async (req, res) => {
    try {
      const { password, email, contact, username } = req.body

      //VALIDATE REQUEST BODY
      if (
        joiHelper(validateUser, {
          password,
          email,
          contact,
          username,
        })?.statusCode
      )
        return

      const user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({
          message: 'Email already exist',
        })
      }

      req.body.password = await bcrypt.hash(password, 10)
      await User.create(req.body)
      res.status(200).json({ message: 'Account created' })
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
