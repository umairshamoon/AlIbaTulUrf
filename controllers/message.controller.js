const Chatroom = require('../models/chatroom.model')
const Message = require('../models/message.model')
const User = require('../models/user.model')

//helper
const cloudinary = require('../helpers/cloudinary')
const buffer = require('../helpers/bufferConversion')
module.exports = {
  getMessagesInConversation: async (req, res) => {
    try {
      const sender = req.user.id
      const { receiver } = req.query

      console.log('s', sender, 'r', receiver)
      const room = await Chatroom.findOne({
        people: {
          $all: [sender, receiver],
        },
      })

      if (!room) throw Error('start chat')
      const messages = await Message.find({ roomId: room._id })
        .select('-roomId -_id -createdAt -updatedAt -__v')
        .populate('sender', '-password', User)
        .populate('receiver', '-password')
      if (!messages.length) throw Error('start conversation')

      res.status(200).json({ messages })
    } catch (e) {
      res
        .status(e?.statusCode || 400)
        .send({ message: e?.message })
    }
  },

  sendMessage: async (req, res) => {
    try {
      const sender = req.user.id
      const { receiver, text } = req.body

      let obj = { text }
      const ext = req?.file?.mimetype
      let resource, response
      console.log(req.file)
      let chatroom
      chatroom = await Chatroom.findOne({
        people: {
          $all: [sender, receiver],
        },
      })

      if (!chatroom)
        chatroom = await Chatroom.create({
          people: [sender, receiver],
        })

      //checks for audio or image

      if (ext === 'audio/mpeg') resource = 'video'
      else resource = 'image'
      if (ext) {
        response = await cloudinary(
          buffer(req?.file?.originalname, req?.file?.buffer),
          {
            resource_type: resource,
          }
        )
      }
      if (ext === 'audio/mpeg')
        obj = { ...obj, audio: response?.secure_url }
      if (
        ext === 'image/jpeg' ||
        ext === 'image/png' ||
        ext === 'image/jpg'
      )
        obj = { ...obj, image: response?.secure_url }

      // return console.log(obj)
      await Message.create({
        sender,
        receiver,
        roomId: chatroom._id,
        message: obj,
      })
      res.status(201).json({ message: 'message sent' })
    } catch (e) {
      res
        .status(e?.statusCode || 400)
        .send({ message: e?.message })
    }
  },
}
