const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin.controller')
const user = require('../controllers/user.controller')
const upload = require('../middleware/multer.middleware')
const { isLogin, isAdmin } = require('../middleware')

router.post('/login', admin.login)
router.put('/edit/profile', isLogin, isAdmin, user.editProfile)
router.put(
  '/edit/profile-pic',
  isLogin,
  isAdmin,
  upload.single('image'),
  user.editProfilePic
)

module.exports = router
