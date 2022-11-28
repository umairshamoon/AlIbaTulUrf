const cloudinary = require('cloudinary').v2
const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET,
} = require('../config')

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

module.exports = cloudinary.uploader.upload
