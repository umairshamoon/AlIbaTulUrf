const { Schema, model } = require('mongoose')
const schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: Number, required: true },
  avatar: { type: String, required: true },
  address: { type: String, required: true },
  orderPlaced: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
})
module.exports = model('user', schema)
