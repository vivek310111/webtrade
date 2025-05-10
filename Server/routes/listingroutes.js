const express = require('express');
const multer = require('multer');
const router = express.Router();
const Listing = require('../models/listing');
const listing = require('../models/listing');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// POST route to save listing data
router.post('/listing', upload.fields([{ name: 'images' }, {name: 'sourceCode'}]), async (req, res) => {
  try {
    const { websiteName, industry, price, websiteType, isResponsive, websiteLink, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    // Create a new listing document
    const newListing = new Listing({
      websiteName,
      industry,
      price,
      websiteType,
      isResponsive,
      images: req.files.images[0].path, // Path of the uploaded image
      sourceCode: req.files.sourceCode[0].path, // Save the zip file path
      websiteLink,
      userId,
    });

    // Save the listing to the database
    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully!' });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// GET route to fetch all listings
router.get('/listing', async (req, res) => {
  try {
    const listings = await Listing.find(); // Exclude rejected listings
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// GET route to fetch only pending listings
router.get('/listing/pending', async (req, res) => {
  try {
    const listings = await Listing.find({ status: 'pending' }); // Fetch only pending listings
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending listings' });
  }
});


// PUT route to update listing status
router.put('/listing/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing status' });
  }
});


// DELETE route to delete a listing
router.delete('/listing/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await listing.findByIdAndDelete(id); // Delete the message by ID
    res.status(200).json({ message: 'Message deleted successfully!' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete the message.' });
  }
});

// GET route to fetch listings by userId
router.get('/listing', async (req, res) => {
  try {
    const { userId } = req.params;
    const listings = await Listing.find(userId ? {userId} : {}); 
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});
module.exports = router;