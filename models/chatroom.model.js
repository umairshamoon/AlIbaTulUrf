const { Schema, model } = require('mongoose')

module.exports = model(
  'chatroom',
  new Schema({
    people: [{ type: Schema.Types.ObjectId }],
  })
)
