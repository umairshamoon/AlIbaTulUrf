const router = require('express').Router()
const order = require('../controllers/order.controller')
const { isLogin, isAdmin } = require('../middleware')

router.post('/add', isLogin, order.add)
router.get('/get', isLogin, order.get)
router.post('/custom', isLogin, order.customOrder)
router.put('/respond/:orderId', isLogin, isAdmin, order.get)
module.exports = router
