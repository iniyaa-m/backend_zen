const express = require('express')
const Contact = require('../models/contact')
const router = express.Router()

// Contact form submission
router.post('/submit', async (req, res) => {
  const { name, email, subject, message } = req.body
  console.log('Contact form submission:', { name, email, subject })

  try {
    const contact = new Contact({ name, email, subject, message })
    await contact.save()
    console.log('Contact saved to authDB.contacts:', contact._id)
    res.json({ message: 'Message sent successfully', contact: { _id: contact._id } })
  } catch (err) {
    console.error('Contact submission error:', err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

module.exports = router