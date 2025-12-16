const mongoose = require('mongoose')
const Product = require('./models/Product')
const Category = require('./models/Category')
const Order = require('./models/Order')
require('dotenv').config()

const products = [
  {
    name: "Hydrating Face Serum",
    brand: "GlowUp",
    price: 1299,
    originalPrice: 1599,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300",
    description: "Intensive hydrating serum with hyaluronic acid",
    inStock: true,
    bestseller: true,
    rating: 4.8,
    reviews: 245
  },
  {
    name: "Matte Liquid Lipstick",
    brand: "VelvetLips",
    price: 899,
    originalPrice: 1199,
    category: "makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300",
    description: "Long-lasting matte finish lipstick",
    inStock: true,
    bestseller: false,
    rating: 4.5,
    reviews: 189
  }
]

const categories = [
  { name: "skincare", description: "Skincare products for all skin types", active: true },
  { name: "makeup", description: "Premium makeup collection", active: true },
  { name: "fragrance", description: "Luxury fragrances", active: true },
  { name: "haircare", description: "Hair care essentials", active: true }
]

const orders = [
  {
    orderId: "ORD001",
    customerName: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543210",
    address: "123 MG Road, Bangalore",
    items: [{ name: "Hydrating Face Serum", price: 1299, quantity: 1 }],
    total: 1299,
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "paid"
  }
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    
    await Product.deleteMany({})
    await Category.deleteMany({})
    await Order.deleteMany({})
    
    await Product.insertMany(products)
    await Category.insertMany(categories)
    await Order.insertMany(orders)
    
    console.log('Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()