import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/checkout.css'; // Add your CSS file for styling

export default function CheckOut() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Bank');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage or API
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price), 0);
  };
  

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderDetails = {
      orderId: `123RGR${Date.now()}`, // Generate a unique order ID
      userId: localStorage.getItem('userId'), // Get user ID from localStorage
      items: cartItems, // Get cart items
      totalAmount: calculateTotal(), // Calculate total
      paymentMethod, // Store selected payment method
      date: new Date(),
    };

    try {
      // Store order details in the database
      const response = await axios.post('/order', orderDetails);
      if (response.status === 201) {
        localStorage.setItem('orderId', orderDetails.orderId); // Store order ID in localStorage
        localStorage.removeItem('cart'); // Clear the cart after successful order
        navigate('/order'); // Redirect to the order confirmation page
      }
    } catch (error) {
      console.error('Error storing order details:', error);
      alert('Failed to process your order. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Payment</h1>
      <div className="payment-method">
        <p>Pay With:</p>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Card"
            checked={paymentMethod === 'Card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Bank"
            checked={paymentMethod === 'Bank'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Bank
        </label>
      </div>
      {paymentMethod === 'Bank' && (
        <div className="bank-details">
          <label htmlFor="bank name">Enter Bank Name</label>
          <input type="text" placeholder="Enter Your Bank Name" />
          <label htmlFor="account number">Enter Account Number</label>
          <input type="text" placeholder="Enter Your Bank Account Number" />
        </div>
      )}
      {paymentMethod === 'Card' && (
        <div className="card-details">
          <div className="card-info">
            <label htmlFor="card number">Enter Card Number</label>
            <input type="text" placeholder="Card Number" />
            <label htmlFor="card holder name">Enter Card Holder Name</label>
            <input type="text" placeholder="Card Holder Name" />
          </div>
          <div className="card-info">
            <label htmlFor="cvv">Enter CVV</label>
            <input type="text" placeholder="Enter Your CVV" />
            <label htmlFor="expiry date">Enter Expiry Date</label>
            <input type="text" placeholder="Expiry Date" />
          </div>
        </div>
      )}
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div className="order-item" key={item._id}>
            <img src={`http://localhost:8000/${item.images}`} alt={item.websiteName} />
            <div>
              <p>{item.websiteName}</p>
              <p className="industry">{item.industry}</p>
            </div>
            <p className="price">₹ {item.price}</p>
          </div>
        ))}
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹ {calculateTotal()}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹ {calculateTotal()}</span>
          </div>
        </div>
        <button className="pay-btn" onClick={handlePayment}>
          Pay Rs. {calculateTotal()}
        </button>
        <p className="privacy-note">
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
        </p>
      </div>
    </div>
  );
}