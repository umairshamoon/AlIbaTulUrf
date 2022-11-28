const { Schema, model } = require('mongoose')
const schema = new Schema({
  color: { type: String, required: true },
  name: { type: String, required: true },
  pearls: { type: Boolean, default: false },
  scarf: { type: Boolean, required: false },
  length: { type: Number, required: true },
  width: { type: String, required: true },
  discription: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
})
module.exports = model('product', schema)
