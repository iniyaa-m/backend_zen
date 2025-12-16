const mongoose = require('mongoose')
const Product = require('./models/Product')
const Category = require('./models/Category')
const Order = require('./models/Order')
const User = require('./models/user')
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
  },
  {
    name: "Vitamin C Brightening Cream",
    brand: "GlowUp",
    price: 1599,
    originalPrice: 1999,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300",
    description: "Brightening cream with vitamin C",
    inStock: true,
    bestseller: true,
    rating: 4.7,
    reviews: 312
  },
  {
    name: "Waterproof Mascara",
    brand: "LashPro",
    price: 799,
    originalPrice: 999,
    category: "makeup",
    image: "https://images.unsplash.com/photo-1631214540242-6c5c2d6e4e5c?w=300",
    description: "Long-lasting waterproof mascara",
    inStock: true,
    bestseller: false,
    rating: 4.4,
    reviews: 156
  },
  {
    name: "Rose Gold Highlighter",
    brand: "GlowUp",
    price: 1199,
    originalPrice: 1499,
    category: "makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300",
    description: "Shimmering rose gold highlighter",
    inStock: true,
    bestseller: true,
    rating: 4.9,
    reviews: 278
  },
  {
    name: "Nourishing Night Cream",
    brand: "NightGlow",
    price: 1799,
    originalPrice: 2199,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300",
    description: "Rich night cream for deep nourishment",
    inStock: true,
    bestseller: false,
    rating: 4.6,
    reviews: 198
  },
  {
    name: "Floral Eau de Parfum",
    brand: "Essence",
    price: 2499,
    originalPrice: 2999,
    category: "fragrance",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
    description: "Elegant floral fragrance",
    inStock: true,
    bestseller: true,
    rating: 4.8,
    reviews: 167
  },
  {
    name: "Repair Hair Mask",
    brand: "HairLux",
    price: 999,
    originalPrice: 1299,
    category: "haircare",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
    description: "Deep repair hair treatment mask",
    inStock: true,
    bestseller: false,
    rating: 4.5,
    reviews: 134
  }
]

const categories = [
  { name: "skincare", description: "Skincare products for all skin types", active: true, productCount: 3 },
  { name: "makeup", description: "Premium makeup collection", active: true, productCount: 3 },
  { name: "fragrance", description: "Luxury fragrances", active: true, productCount: 1 },
  { name: "haircare", description: "Hair care essentials", active: true, productCount: 1 }
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
  },
  {
    orderId: "ORD002",
    customerName: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 9876543211",
    address: "456 Park Street, Mumbai",
    items: [{ name: "Matte Liquid Lipstick", price: 899, quantity: 2 }],
    total: 1798,
    status: "shipped",
    paymentMethod: "Card",
    paymentStatus: "paid"
  },
  {
    orderId: "ORD003",
    customerName: "Anita Patel",
    email: "anita@example.com",
    phone: "+91 9876543212",
    address: "789 Ring Road, Delhi",
    items: [{ name: "Rose Gold Highlighter", price: 1199, quantity: 1 }],
    total: 1199,
    status: "processing",
    paymentMethod: "UPI",
    paymentStatus: "paid"
  },
  {
    orderId: "ORD004",
    customerName: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 9876543213",
    address: "321 Beach Road, Chennai",
    items: [{ name: "Floral Eau de Parfum", price: 2499, quantity: 1 }],
    total: 2499,
    status: "pending",
    paymentMethod: "Card",
    paymentStatus: "pending"
  },
  {
    orderId: "ORD005",
    customerName: "Kavya Singh",
    email: "kavya@example.com",
    phone: "+91 9876543214",
    address: "654 Mall Road, Pune",
    items: [{ name: "Vitamin C Brightening Cream", price: 1599, quantity: 1 }],
    total: 1599,
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "paid"
  }
]

const users = [
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "hashedpassword1",
    blocked: false,
    role: "user"
  },
  {
    name: "Rahul Kumar",
    email: "rahul@example.com",
    password: "hashedpassword2",
    blocked: false,
    role: "user"
  },
  {
    name: "Anita Patel",
    email: "anita@example.com",
    password: "hashedpassword3",
    blocked: false,
    role: "user"
  },
  {
    name: "Sneha Reddy",
    email: "sneha@example.com",
    password: "hashedpassword4",
    blocked: true,
    role: "user"
  },
  {
    name: "Admin User",
    email: "admin@zenvy.com",
    password: "hashedpassword5",
    blocked: false,
    role: "admin"
  }
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    
    await Product.deleteMany({})
    await Category.deleteMany({})
    await Order.deleteMany({})
    await User.deleteMany({})
    
    await Product.insertMany(products)
    await Category.insertMany(categories)
    await Order.insertMany(orders)
    await User.insertMany(users)
    
    console.log('Database seeded with comprehensive data')
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()