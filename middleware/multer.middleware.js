const multer = require('multer')

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 1024 * 1024 * 500,
  },
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'audio/aac'
    ) {
      done(null, true)
    } else {
      done(new Error('please select an image'), false)
    }
  },
})

// module.exports = upload
