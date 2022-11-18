let multer = require('multer')

//Specify the storage engine
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      done(null, true)
    } else {
      var newError = new Error('please select an image')
      newError.name = 'MulterError'
      done(newError, false)
    }
  },
})

module.exports = upload
