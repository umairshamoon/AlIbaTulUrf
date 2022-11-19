const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
const upload = require('../middleware/multer.middleware')
const { isLogin, isAdmin } = require('../middleware')

router.post('/login', user.login)
router.post('/register', upload.single('image'), user.register)

module.exports = router
