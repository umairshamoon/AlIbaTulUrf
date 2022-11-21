const { Schema, model } = require('mongoose')
const schema = new Schema({
  abayas: [
    {
      details: { type: Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, required: tyre },
    },
  ],
  customer: { type: Schema.Types.ObjectId, ref: 'user' },
})
module.exports = model('cart', schema)
