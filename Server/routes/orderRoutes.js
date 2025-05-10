const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import the Order model
const User = require('../models/user'); // Import the User model

// POST route to store order details
router.post('/order', async (req, res) => {
  try {
    const { orderId, userId, items, totalAmount, paymentMethod, date } = req.body;

    const newOrder = new Order({
      orderId,
      userId,
      items,
      totalAmount,
      paymentMethod,
      date,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order stored successfully!', orderId: savedOrder.orderId });
  } catch (error) {
    console.error('Error storing order:', error);
    res.status(500).json({ error: 'Failed to store order' });
  }
});

// GET route to fetch orders for a specific user
router.get('/orders', async (req, res) => {
    try {
      const { userId } = req.query;
      const orders = await Order.find({ userId }).sort({ date: -1 }); // Fetch orders sorted by date
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  // GET route to fetch order details by orderId
  router.get('/order/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findOne({ orderId });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      const buyer = await User.findById(order.userId);

      // Format the response to include buyerName
      const formattedOrder = {
        ...order._doc,
        buyerName: buyer ? buyer.name : 'Unknown Buyer', // Use buyer's name or fallback
      };

      res.status(200).json(formattedOrder);
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Failed to fetch order details' });
    }
  });

  router.get('/order-reports', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.userId', 'name'); // Populate seller name

    // Fetch buyer names and format the response
    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const buyer = await User.findById(order.userId); // Fetch buyer details
        const seller = order.items[0]?.userId
        ? await User.findById(order.items[0].userId)
        : null; // Fetch seller details
        return {
          orderId: order.orderId,
          buyerName: buyer ? buyer.name : 'Unknown Buyer', // Use buyer's name or fallback
          sellerName: seller ? seller.name:  'Unknown Seller', // Use seller's name or fallback
          date: order.date,
          items: order.items,
        };
      })
    );

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Error fetching order reports:', error);
    res.status(500).json({ error: 'Failed to fetch order reports' });
  }
});

  
// GET route to fetch sales for a specific seller
router.get('/sales', async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch all orders where the seller's userId matches
    const sales = await Order.find({ 'items.userId': userId }).select(
      'orderId items.websiteName items.price'
    );

    // Flatten the items array and include the orderId
    const formattedSales = sales.flatMap((order) =>
      order.items.map((item) => ({
        orderId: order.orderId,
        websiteName: item.websiteName,
        price: item.price,
      }))
    );

    res.status(200).json(formattedSales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});
  



module.exports = router;