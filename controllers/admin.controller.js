//npm
const bcrypt = require('bcryptjs')
//models
const Admin = require('../models/user.model')
//validatoins
const validateLogin = require('../validations/login.validation')
const validateAdmin = require('../validations/adminRegister.validate')
//helpers
const joiHelper = require('../helpers/joi.helper')
const jwtSign = require('../helpers/jwtSign.helper')

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body

      if (joiHelper(validateLogin, req.body)?.statusCode) return

      const admin = await Admin.findOne({ email })

      if (admin.role !== 'admin')
        return res
          .status(403)
          .json({ message: 'access denaied' })

      if (!(await bcrypt.compare(password, admin.password)))
        return res
          .status(400)
          .json({ message: 'Incorrect Password' })

      res.status(200).json({
        message: 'Login successfully',
        token: jwtSign({ id: admin.id }),
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
