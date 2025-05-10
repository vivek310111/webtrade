import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/orderReports.css'; // Add your CSS file for styling
import AdminNavbar from '../components/AdminNavbar'; // Assuming you have an AdminNavbar component
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function OrderReports() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Use useNavigate from react-router-dom

  useEffect(() => {
    // Fetch all orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/order-reports'); // Fetch orders from the backend
        setOrders(response.data);
        setFilteredOrders(response.data); // Initialize filtered orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter((order) =>
      order.orderId.toLowerCase().includes(query) ||
      order.buyerName.toLowerCase().includes(query) ||
      order.sellerName.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/admin-order-summary/${orderId}`); // Navigate to AdminOrderSummary page
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-order-reports-container">
        <h1>Orders</h1>
        <div className="admin-search-bar-container">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="admin-search-bar"
          />
        </div>
        <div className="admin-orders-list">
          {filteredOrders.map((order) => (
            <div className="admin-order-card" key={order.orderId}>
              <img
                src={`https://webtrade-2u21.onrender.com/${order.items[0]?.images}`}
                alt="Order Thumbnail"
                className="admin-order-thumbnail"
              />
              <div className="admin-order-details">
                <p>
                  <strong>Seller Name:</strong> {order.sellerName}
                </p>
                <p>
                  <strong>Buyer Name:</strong> {order.buyerName}
                </p>
                <p>
                  <strong>Ordered on Date:</strong>{' '}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>OrderId:</strong> #{order.orderId}
                </p>
              </div>
              <button className="admin-view-order-btn"  onClick={() => handleViewOrder(order.orderId)}
              >➤</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}