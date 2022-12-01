const router = require('express').Router()
const admin = require('../controllers/admin.controller')
const { isLogin, isAdmin } = require('../middleware')
router.post('/login', admin.login)
router.put(
  '/update/product/:productId',
  isLogin,
  isAdmin,
  admin.upadteProduct
)
router.get(
  '/fetch/customers',
  isLogin,
  isAdmin,
  admin.fetchCustomers
)
module.exports = router
