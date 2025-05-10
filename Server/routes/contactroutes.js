const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST route to save contact form data
router.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    // Create a new contact document
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    // Save to the database
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});


// GET route to retrieve contact messages
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 }); // Sort by most recent
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// DELETE /contact/:id
router.delete('/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id); // Delete the message by ID
    res.status(200).json({ message: 'Message deleted successfully!' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete the message.' });
  }
});


module.exports = router