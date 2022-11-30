const Chatroom = require('../models/chatroom.model')
const Message = require('../models/message.model')
const User = require('../models/user.model')

//helper
const cloudinary = require('../helpers/cloudinary')
const bufferConversion = require('../helpers/bufferConversion')
module.exports = {
  getMessagesInConversation: async (req, res) => {
    try {
      const sender = req.user.id
      const { receiver } = req.query
      const room = await Chatroom.findOne({
        people: {
          $all: [sender, receiver],
        },
      })

      if (!room) throw Error('start chat')
      const messages = await Message.find({ roomId: room._id })
        .select('-roomId -createdAt -updatedAt -__v')
        .populate('sender receiver', '-password', User)
        .sort({ messageTime: -1 })

      if (!messages.length) throw Error('start conversation')
      const response = messages.map((m) => {
        if (m.message.image != null)
          return {
            _id: m._id,
            text: m.message.text,
            image: m.message.image,
            createdAt: m.messageTime,
            user: {
              _id: m.sender._id,
              name: m.sender.username,
              avatar: m.sender.avatar,
            },
          }
        if (m.message.audio != null)
          return {
            _id: m._id,
            text: m.message.text,
            audio: m.message.audio,
            createdAt: m.messageTime,
            user: {
              _id: m.sender._id,
              name: m.sender.username,
              avatar: m.sender.avatar,
            },
          }
        return {
          _id: m._id,
          text: m.message.text,
          createdAt: m.messageTime,
          user: {
            _id: m.sender._id,
            name: m.sender.username,
            avatar: m.sender.avatar,
          },
        }
      })
      res.status(200).json({ response })
    } catch (e) {
      res
        .status(e?.statusCode || 400)
        .send({ message: e?.message })
    }
  },

  sendMessage: async (req, res) => {
    try {
      const sender = req.user.id
      const { text, messageTime = new Date() } = req.body
      const { receiver } = req.query
      let obj = { text, messageTime }
      let resource, response
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
      if (req.file) {
        const { mimetype, buffer, originalname } = req.file
        if (mimetype) {
          if (mimetype === 'audio/aac') resource = 'video'
          else resource = 'image'

          response = await cloudinary(
            bufferConversion(originalname, buffer),
            { resource_type: resource }
          )
          if (mimetype === 'audio/aac')
            obj = { ...obj, audio: response?.secure_url }
          if (
            mimetype === 'image/jpeg' ||
            mimetype === 'image/png' ||
            mimetype === 'image/jpg'
          )
            obj = { ...obj, image: response?.secure_url }
        }
      }
      await Message.create({
        sender,
        receiver,
        roomId: chatroom._id,
        message: obj,
        messageTime,
      })
      res.status(201).json({ message: 'message sent' })
    } catch (e) {
      console.log('error ==> ', e)
      res
        .status(e?.statusCode || 400)
        .send({ message: e?.message })
    }
  },
}
