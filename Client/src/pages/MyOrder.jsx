import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/myorder.css'; // Add your CSS file for styling
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId'); // Get user ID from localStorage
      try {
        const response = await axios.get(`/orders?userId=${userId}`);
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
      order.orderId.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-details/${orderId}`); // Redirect to the order details page
  };


  return (
    <>
    <Navbar />
    <div className="orders-container">
      <h1> My Orders</h1>
      <div className="order-search-and-filter">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="order-search-bar"
        />
      </div>
      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div className="order-card" key={order.orderId}>
            <img
              src={order.items[0]?.images ? `http://localhost:8000/${order.items[0].images}` : 'placeholder.jpg'}
              alt="Order Thumbnail"
              className="order-thumbnail"
            />
            <div className="order-details">
              <p>{order.items.length} Items in This Order</p>
              <p>
                Ordered on Date: <b>{new Date(order.date).toLocaleDateString()}</b>
              </p>
              <p>
                OrderId: <b>#{order.orderId}</b>
              </p>
            </div>
            <button className="view-order-btn" onClick={() => handleViewOrder(order.orderId)}>➤</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
</>
  );
}