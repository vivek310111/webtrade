import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/adminNavbar.css'; // Import the CSS file for styling

export default function AdminNavbar() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to control the logout popup visibility
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutPopup(true); // Show the logout confirmation popup
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false); // Hide the popup
    localStorage.removeItem('authToken'); // Clear the authentication token
    navigate('/login'); // Redirect to the login page
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false); // Close the popup
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
    <>
      <nav className="a-navbar">
        <div className="a-navbar-container">
          {/* Logo Section */}
          <div className="a-navbar-left">
            <Link to="/admin/dashboard" className="a-logo">
              <h1>Web<span>Trade</span></h1>
            </Link>
          </div>

          {/* Links Section */}
          <div className="a-navbar-right">
            <ul className="a-navbar-links">
              <li className="a-navbar-item">
                <Link to="/admin/reports" className="a-navbar-link">
                  Reports
                </Link>
              </li>
              <li className="a-navbar-item">
                <Link to="/admin/contact" className="a-navbar-link">
                  Inquiries
                </Link>
              </li>
              <li className="a-navbar-item">
                <Link to="/admin/orders" className="a-navbar-link">
                  Orders
                </Link>
              </li>
              <li className="a-navbar-item">
                <Link to="/admin/manage-listings" className="a-navbar-link">
                 Manage Listings
                </Link>
              </li>
            </ul>
            <button className="a-navbar-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="a-logout-popup">
          <div className="a-logout-popup-content">
            <p>Do you want to logout?</p>
            <div className="a-logout-popup-buttons">
              <button className="a-confirm-button" onClick={handleConfirmLogout}>
                Confirm
              </button>
              <button className="a-cancel-button" onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}