const router = require('express').Router()
const message = require('../controllers/message.controller')

//middlewares
const upload = require('../middleware/multer.middleware')
const { isLogin } = require('../middleware')
router.post(
  '/send',
  isLogin,
  upload.single('file'),
  message.sendMessage
)
router.get('/chat', isLogin, message.getMessagesInConversation)

module.exports = router
