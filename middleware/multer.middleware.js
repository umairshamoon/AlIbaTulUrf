let multer = require('multer')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 500,
  },
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'audio/aac'
    ) {
      console.log(file)
      done(null, true)
    } else {
      console.log(file)
      console.log('yaha error')
      var newError = new Error('please select an image')
      newError.name = 'MulterError'
      done(newError, false)
    }
  },
})

module.exports = upload
