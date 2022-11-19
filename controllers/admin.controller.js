//npm
const bcrypt = require('bcryptjs')
//models
const Admin = require('../models/user.model')
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
      const admin = await Admin.findOne({ email })
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
        },
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  addProduct: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
