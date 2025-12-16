const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5177'],
  credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB Atlas - authDB database'))
  .catch(err => console.error('MongoDB connection error:', err))

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const adminAuthRoutes = require('./routes/adminAuth');
const orderRoutes = require('./routes/order');

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/admin/auth', adminAuthRoutes)
app.use('/api/orders', orderRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
