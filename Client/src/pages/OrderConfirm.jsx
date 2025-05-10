import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/orderConfirm.css'; // Add your CSS file for styling

export default function OrderConfirm() {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Fetch the order ID from localStorage or API
    const storedOrderId = localStorage.getItem('orderId');
    if (storedOrderId) {
      setOrderId(storedOrderId);
    } else {
      setOrderId('123RGR231567Y'); // Fallback order ID for testing
    }
  }, []);

  const handleDownload = () => {
    // Simulate downloading the zip file
    alert('Downloading source code...');
  };

  return (
    <div className="order-confirmation-container">
      <h1>Thank You!</h1>
      <p>Order #{orderId} Confirmed</p>
      <button className="download-btn" onClick={handleDownload}>
        Download Zip
      </button>
      <Link to="/myorders" className="view-orders-link">
        View My Orders
      </Link>
    </div>
  );
}