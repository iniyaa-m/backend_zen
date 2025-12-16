const mongoose = require('mongoose')
const Product = require('./models/Product')
require('dotenv').config()

const newProducts = [
  {
    name: 'Vitamin E Night Cream',
    brand: 'NightGlow',
    price: 1899,
    originalPrice: 2299,
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1556228578-dd6e4b3b9de7?w=300',
    description: 'Rich vitamin E night cream for deep nourishment and anti-aging',
    inStock: true,
    bestseller: false,
    rating: 4.6,
    reviews: 156
  },
  {
    name: 'Matte Foundation',
    brand: 'FlawlessBase',
    price: 1599,
    originalPrice: 1999,
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
    description: 'Long-lasting matte foundation with full coverage',
    inStock: true,
    bestseller: true,
    rating: 4.7,
    reviews: 203
  },
  {
    name: 'Coconut Hair Oil',
    brand: 'NaturalCare',
    price: 899,
    originalPrice: 1199,
    category: 'haircare',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
    description: 'Pure coconut oil for hair nourishment and growth',
    inStock: true,
    bestseller: false,
    rating: 4.4,
    reviews: 89
  },
  {
    name: 'Rose Perfume',
    brand: 'FloralScents',
    price: 2799,
    originalPrice: 3299,
    category: 'fragrance',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300',
    description: 'Elegant rose fragrance with long-lasting scent',
    inStock: true,
    bestseller: true,
    rating: 4.8,
    reviews: 134
  },
  {
    name: 'Eye Shadow Palette',
    brand: 'ColorPop',
    price: 1399,
    originalPrice: 1799,
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300',
    description: '12-shade eyeshadow palette with vibrant colors',
    inStock: true,
    bestseller: false,
    rating: 4.5,
    reviews: 178
  }
]

async function seedNewProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
    
    await Product.insertMany(newProducts)
    console.log('5 new products added successfully!')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding products:', error)
    process.exit(1)
  }
}

seedNewProducts()