import React from 'react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast'; // Import toast for notifications
import { Link, useNavigate } from 'react-router-dom';
import '../assets/sellernavbar.css'; // Add your CSS file for styling

export default function SellerNavbar() {
  const navigate = useNavigate();
  const hasShownToast = useRef(false); // Ref to track if the toast has already been shown


  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the authentication token
    localStorage.removeItem('userType'); // Clear the user type
    navigate('/login'); // Redirect to the login page
  };


  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Check if the user is authenticated
    if (!authToken) {
      navigate("/login"); // Redirect to login if not authenticated
      if (!hasShownToast.current) {
        toast.error('Please login to continue'); // Show error message only once
        hasShownToast.current = true; // Mark the toast as shown
      }
    }
  }, [navigate]);
  return (
    <nav className="s-navbar">
      <div className="s-navbar-container">
        {/* Logo Section */}
        <div className="s-navbar-left">
          <Link to="/seller/dashboard" className="s-logo">
            <h1>Web<span>Trade</span></h1>
          </Link>
        </div>

        {/* Links Section */}
        <div className="s-navbar-right">
          <ul className="s-navbar-links">
            <li className="s-navbar-item">
              <Link to="/seller/listing" className="s-navbar-link">
                List Website
              </Link>
            </li>
            <li className="s-navbar-item">
              <Link to="/seller/your-listings" className="s-navbar-link">
                Your Listings
              </Link>
            </li>
            <li className="s-navbar-item">
              <Link to="/seller/sales" className="s-navbar-link">
                Sales
              </Link>
            </li>
            <li className="s-navbar-item">
              <Link to="/contact" className="s-navbar-link">
                Contact
              </Link>
            </li>
          </ul>
          <button className="s-navbar-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}