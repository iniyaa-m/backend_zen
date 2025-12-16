const express = require('express')
const Order = require('../models/Order')
const router = express.Router()

// CREATE ORDER
router.post('/create', async (req, res) => {
  try {
    const { customerName, email, phone, address, items, total, paymentMethod } = req.body
    
    // Generate unique order ID
    const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    
    const order = new Order({
      orderId,
      customerName,
      email,
      phone,
      address,
      items,
      total,
      paymentMethod,
      paymentStatus: 'paid',
      status: 'pending'
    })
    
    await order.save()
    console.log('Order saved to database:', order._id)
    
    res.json({ 
      message: 'Order created successfully', 
      orderId: order.orderId,
      order: order 
    })
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// GET ALL ORDERS (for admin)
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

module.exports = router