const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  active: { type: Boolean, default: true },
  productCount: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)