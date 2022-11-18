const Chatroom = require('../models/chatroom.model')
const Message = require('../models/message.model')
const User = require('../models/user.model')

//helper
const cloudinary = require('../helpers/cloudinary')
const buffer = require('../helpers/bufferConversion')
module.exports = {
  getMessagesInConversation: async (req, res) => {
    try {
      const { roomId } = req.params

      const messages = await Message.find({ roomId })
        .select('-roomId -_id -createdAt -updatedAt -__v')
        .populate('sender', '-password', User)
        .populate('receiver', '-password')
      if (!messages.length)
        return res
          .status(404)
          .json({ messages: 'start conversation' })

      res.status(200).json({ messages, message: 'Fetched' })
    } catch (e) {
      res
        .status(e?.statusCode || 400)
        .send({ message: e?.message })
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { sender, receiver } = req.body
      const ext = req?.file?.mimetype
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
      req.body.roomId = chatroom._id
      //checks for audio or image

      if (ext === 'audio/mpeg') resource = 'video'
      else resource = 'image'
      if (ext) {
        response = await cloudinary(
          filename,
          buffer(req?.file?.originalname, req?.file?.buffer),
          {
            resource_type: resource,
          }
        )
      }
      if (ext === 'audio/mpeg')
        req.body.message.image = response.secure_url
      else req.body.message.audio = response.secure_url

      await Message.create(req.body)
      res.status(201).json({ message: 'message sent' })
    } catch (e) {
      res
        .status(e?.statusCode || 400)
        .send({ message: e?.message })
    }
  },
}
