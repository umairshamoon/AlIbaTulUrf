const router = require('express').Router()
const user = require('../controllers/user.controller')
const upload = require('../middleware/multer.middleware')
const { isLogin, isAdmin } = require('../middleware')

router.post('/login', user.login)
router.put('/edit/profile', isLogin, user.editProfile)
router.put(
  '/edit/profile-pic',
  upload.single('image'),
  isLogin,
  user.editProfilePic
)
router.post('/register', upload.single('image'), user.register)

module.exports = router
