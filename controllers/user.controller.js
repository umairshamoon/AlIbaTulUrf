//npm
const bcrypt = require('bcryptjs')
//models
const User = require('../models/user.model')
//validatoins
const validateLogin = require('../validations/login.validation')
const validateUser = require('../validations/userRegister.validate')
const validateEditProfile = require('../validations/editProfile.validate')
//helpers
const joiHelper = require('../helpers/joi.helper')
const jwtSign = require('../helpers/jwtSign.helper')
const cloudinary = require('../helpers/cloudinary')
const bufferConversion = require('../helpers/bufferConversion')

module.exports = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body
      console.log(req.body)
      joiHelper(validateLogin, req.body)
      const user = await User.findOne({ email })
      if (!user) throw Error('incorrect email')
      if (!(await bcrypt.compare(password, user.password)))
        throw Error('incorrect password')

      res.status(200).json({
        message: 'Login successfully',
        token: jwtSign({ id: user.id }),
        user: {
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          contact: user.contact,
          address: user.address,
          id: user._id,
        },
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  register: async (req, res) => {
    try {
      const { password, email } = req.body
      const { originalname, buffer } = req.file
      joiHelper(validateUser, req.body)
      if (!originalname)
        throw Error('please upload profile image')
      const user = await User.findOne({ email })
      if (user) {
        throw Error('user already exists')
      }
      const { secure_url } = await cloudinary(
        bufferConversion(originalname, buffer)
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
  editProfile: async (req, res) => {
    try {
      joiHelper(validateEditProfile, req.body)
      const doc = await User.findByIdAndUpdate(
        req.user.id,
        { $set: req.body },
        { new: true }
      )
      if (!doc) throw Error('something went wrong')
      res.status(200).json({ message: 'Profile Updated' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  editProfilePic: async (req, res) => {
    try {
      const { originalname, buffer } = req.file
      if (!originalname) throw Error('Please select a picture')
      const { secure_url } = await cloudinary(
        bufferConversion(originalname, buffer)
      )

      const doc = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { avatar: secure_url } },
        { new: true }
      )
      if (!doc) throw Error('something went wrong')
      res.status(200).json({ message: 'Picture Updated' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}
