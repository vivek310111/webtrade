import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/ordersummary.css'; // Add your CSS file for styling

export default function AdminOrderSummary() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/order/${orderId}`); // Fetch order details from the backend
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-order-summary-container">
      <h1>Order Summary</h1>
      <div className="admin-order-summary">
        <p>
          <strong>Order id:</strong> #{order.orderId}
        </p>
        <p>
          <strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Buyer Name:</strong> {order.buyerName}
        </p>
        <div className="admin-order-items">
          <h3>Items in This Order</h3>
          {order.items.map((item, index) => (
            <div className="admin-order-item" key={index}>
              <img
                src={`https://webtrade-2u21.onrender.com/${item.images}`}
                alt={item.websiteName}
                className="admin-order-item-thumbnail"
              />
              <p>{item.websiteName}</p>
              <p>Price: ₹ {item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="admin-order-total">
          <p>
            <strong>Item Subtotal ({order.items.length}):</strong> ₹{' '}
            {order.totalAmount.toLocaleString()}
          </p>
          <p>
            <strong>Grand Total:</strong> ₹ {order.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}