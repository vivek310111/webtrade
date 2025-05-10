import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/orderdetails.css'; // Add your CSS file for styling

export default function OrderDetails() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details by order ID
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/order/${orderId}`);
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
    <div className="order-details-container">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="order-items">
          <h3>Items in This Order</h3>
          <div className="items-list">
            {order.items.map((item, index) => (
              <div className="item-card" key={index}>
                <img
                  src={`https://webtrade-2u21.onrender.com/${item.images}`}
                  alt={item.websiteName}
                  className="item-thumbnail"
                />
                <p>{item.websiteName}</p>
                <div className="item-actions">
                  <a
                    href={item.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-website-btn"
                  >
                    View This Website
                  </a>
                  <a
                    href={`https://webtrade-2u21.onrender.com/${item.sourceCode}`}
                    download
                    className="source-code-btn"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p>
          Order id: <b>#{order.orderId}</b>
        </p>
        <p>
          Order Date: <b>{new Date(order.date).toLocaleDateString()}</b>
        </p>
        <div className="order-total">
          <p>
            Item Subtotal ({order.items.length}): <b>₹ {order.totalAmount}</b>
          </p>
          <p>
            Grand Total: <b>₹ {order.totalAmount}</b>
          </p>
        </div>
      </div>
    </div>
  );
}