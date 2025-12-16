const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = express.Router()

// SIGN UP
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  console.log('Signup attempt:', { name, email })

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    console.log('User saved to authDB.users:', user._id)
    res.json({ message: 'Signup successful', user: { name, email, _id: user._id } })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(400).json({ error: 'User already exists' })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log('Login attempt:', { email })
  
  const user = await User.findOne({ email })

  if (!user) return res.status(400).json({ error: 'User not found' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ error: 'Invalid password' })

  console.log('Login successful for user:', user._id)
  res.json({ message: 'Login successful', user: { name: user.name, email, _id: user._id } })
})

module.exports = router
