const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  bestseller: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)