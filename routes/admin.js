const express = require('express')
const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/user')
const Category = require('../models/Category')
const router = express.Router()

// Products Routes
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Orders Routes
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/orders/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    )
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Users Routes
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/users/:id/block', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { blocked: req.body.blocked },
      { new: true }
    ).select('-password')
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Categories Routes
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body)
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(category)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.json({ message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Dashboard Stats
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ])
    
    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router