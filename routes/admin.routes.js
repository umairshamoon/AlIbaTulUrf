const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin.controller')
const user = require('../controllers/user.controller')
const upload = require('../middleware/multer.middleware')
const { isLogin, isAdmin } = require('../middleware')

router.post('/login', admin.login)
module.exports = router
