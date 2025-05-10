import React, { useState, useEffect } from 'react';
import '../assets/cart.css'; // Add your CSS file for styling
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage or API
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price), 0); // Calculate total price
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }); // Format price in INR
  }

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    navigate('/checkout'); // Redirect to checkout page
  };

  return (
    <>
    < Navbar />
    <div className="cart-container">
      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="product-info">
                    <img src={`http://localhost:8000/${item.images}`} alt={item.websiteName} />
                    <span>{item.websiteName}</span>
                  </td>
                  <td> {formatPrice(Number(item.price))}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-cart">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>{formatPrice(calculateTotal())}</span>
        </div>
        <div className="summary-item total">
          <span>Total</span>
          <span>{formatPrice(calculateTotal())}</span>
        </div>
        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          >
          Check Out
        </button>
      </div>
    </div>
  < Footer />
  </>
  );
}