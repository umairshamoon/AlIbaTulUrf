const { Schema, model } = require('mongoose')

module.exports = model(
  'message',
  new Schema({
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'chatroom',
      required: true,
    },
    message: {
      text: { type: String },
      image: { type: String },
      audio: { type: String },
    },
    sender: { type: Schema.Types.ObjectId },
    receiver: { type: Schema.Types.ObjectId },
    messageTime: { type: Date, default: new Date() },
  })
)
