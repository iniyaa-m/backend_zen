const mongoose = require('mongoose')
const Product = require('./models/Product')
require('dotenv').config()

async function updateVitaminEImage() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
    
    await Product.updateOne(
      { name: 'Vitamin E Night Cream' },
      { image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300' }
    )
    
    console.log('Vitamin E Night Cream image updated successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error updating image:', error)
    process.exit(1)
  }
}

updateVitaminEImage()