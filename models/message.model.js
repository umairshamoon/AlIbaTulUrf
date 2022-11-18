const { Schema, model } = require('mongoose')

module.exports = model(
  'message',
  new Schema(
    {
      roomId: {
        type: Schema.Types.ObjectId,
        ref: 'chatroom',
        required: true,
      },
      message: { type: String, required: true },
      sender: { type: Schema.Types.ObjectId },
      receiver: { type: Schema.Types.ObjectId },
      messageTime: { type: Date, default: Date.now() },
    },
    { timestamps: true }
  )
)
