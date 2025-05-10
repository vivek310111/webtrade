const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true, // Ensure orderId is unique
  },
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      _id: { type: String, required: true }, // ID of the item
      websiteName: { type: String, required: true },
      price: { type: Number, required: true },
      images: { type: String }, // Path to the image
      industry: { type: String },
      websiteLink: { type: String, required: true }, // URL of the website
      sourceCode: { type: String, required: true }, // Path to the source code file
      userId: { type: String, required: true }, // ID of the seller
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'Bank'], // Restrict to specific payment methods
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
});

module.exports = mongoose.model('Order', orderSchema);