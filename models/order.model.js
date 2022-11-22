const { Schema, model } = require('mongoose')
const schema = new Schema({
  abayas: [
    {
      details: { type: Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'rejected', 'approved'],
    default: 'pending',
  },
  customer: { type: Schema.Types.ObjectId, ref: 'user' },
  message: { type: String, default: 'default message' },
})
module.exports = model('order', schema)
