const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Check if user exists
    let user = await User.findOne({ email })
    
    if (!user) {
      // Auto-register admin if not found
      const hashedPassword = await bcrypt.hash(password, 10)
      user = new User({
        name: 'Admin User',
        email,
        password: hashedPassword,
        role: 'admin',
        blocked: false
      })
      await user.save()
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' })
    }
    
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router