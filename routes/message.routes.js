const express = require('express')
const router = express.Router()
const message = require('../controllers/message.controller')

//middlewares
const upload = require('../middleware/multer.middleware')
router.post(
  '/send',
  upload.single('image') || upload.single('audio'),
  message.sendMessage
)
router.get('/chat/:roomId', message.getMessagesInConversation)

module.exports = router
