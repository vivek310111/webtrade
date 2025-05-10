const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  websiteName: { type: String, required: true },
  industry: { type: String, required: true },
  price: { type: String, required: true },
  websiteType: { type: String, required: true },
  isResponsive: { type: String, required: true },
  images: { type: String, required: true },
  sourceCode: { type: String, required: true }, // Store the zip file path
  userId: { type: String, required: true },
  status: { type: String, default: 'pending' }, // New field for status
  websiteLink: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Listing', listingSchema);