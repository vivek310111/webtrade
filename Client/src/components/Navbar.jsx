import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { toast } from "react-hot-toast"
import '../components/navbar.css'
import logo from '../assets/images/logo.png'
import cart from '../assets/images/cart.png'
import logout from '../assets/images/logout.svg'

function Navbar() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to control the pop-up visibility
  const navigate = useNavigate(); // For navigation after logout

  

  const handleLogoutClick = () => {
    setShowLogoutPopup(true); // Show the pop-up when logout icon is clicked
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false); // Hide the pop-up
    localStorage.removeItem("authToken"); // Clear the authentication token
    localStorage.removeItem("userType"); // Clear the user type
    console.log("User logged out");
    navigate("/login"); // Redirect to login page

    window.history.replaceState(null, "", window.location.href);

  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false); // Close the pop-up
  };


  return( 
    <>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to='/home'  className="logo">
          <img src={logo} alt="WEB TRADE" ></img>
          </Link>
        </div>
        <div className="navbar-right">
          <ul className="navbar-links">
            <li className="navbar-item">
              <Link to='/home' className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to='/pricing' className="navbar-link">Pricing</Link>
            </li>
            <li className="navbar-item">
              <Link to='/myorders' className="navbar-link">My Orders</Link>
            </li>
            <li className="navbar-item">
              <Link to='/contact' className="navbar-link">Contact</Link>
            </li>
          </ul>
          <div className="navbar-icons">
              <button className="navbar-btn" onClick={handleLogoutClick}>
                <img src={logout} alt="Logout" />
              </button>
              <Link to='/cart' className="navbar-icon">
              <img src={cart} alt="" />
              </Link>
          </div>
        </div>
      </div>
    </nav>

    {showLogoutPopup && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <p>Do you Want To Logout?</p>
            <div className="logout-popup-buttons">
              <button className="confirm-button" onClick={handleConfirmLogout}>
                Confirm
              </button>
              <button className="cancel-button" onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
</>  
  )
}

export default Navbar