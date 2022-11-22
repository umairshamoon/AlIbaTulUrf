const router = require('express').Router()
const cart = require('../controllers/cart.controller')
const { isLogin } = require('../middleware')

router.post('/add', isLogin, cart.add)
router.get('/get', isLogin, cart.get)
module.exports = router
