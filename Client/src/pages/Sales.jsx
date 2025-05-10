import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/sales.css'; // Add your CSS file for styling
import SellerNavbar from '../components/SellerNavbar';

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all sold websites for the seller
    const fetchSales = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get the seller's userId
        const response = await axios.get(`/sales?userId=${userId}`); // Fetch sales data from the backend
        setSales(response.data);
        setFilteredSales(response.data); // Initialize filtered sales
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = sales.filter((sale) =>
      sale.websiteName.toLowerCase().includes(query)
    );
    setFilteredSales(filtered);
  };

  const calculateTotal = () => {
    return filteredSales.reduce((total, sale) => total + sale.price, 0);
  };

  return (
    <>
    <SellerNavbar />
    <div className="sales-container">
      <h1>Sales Report</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <table className="sales-table">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>Website Name</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale._id}>
              <td>#{sale.orderId}</td>
              <td>{sale.websiteName}</td>
              <td>₹ {sale.price.toLocaleString()}</td>
              <td>₹ {sale.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-container">
        <p>
          <strong>Total:</strong> ₹ {calculateTotal().toLocaleString()}
        </p>
      </div>
    </div>
    </>
  );
}