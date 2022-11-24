const router = require('express').Router()
const admin = require('../controllers/admin.controller')
const { isLogin, isAdmin } = require('../middleware')
router.post('/login', admin.login)
router.get(
  '/fetch/customers',
  isLogin,
  isAdmin,
  admin.fetchCustomers
)
module.exports = router
