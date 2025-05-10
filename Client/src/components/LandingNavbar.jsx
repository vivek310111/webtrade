import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/landingnavbar.css'; // Add your CSS file for styling

export default function LandingNavbar() {
  return (
    <nav className="landing-navbar">
      <div className="lnavbar-container">
        {/* Logo Section */}
        <div className="lnavbar-left">
            <h1>Web<span>Trade</span></h1>
        </div>

        {/* Links Section */}
        <div className="lnavbar-right">
          <ul className="lnavbar-links">
            <li className="lnavbar-item">
              <Link to="/pricing" className="navbar-link">
                Pricing
              </Link>
            </li>
            <li className="lnavbar-item">
              <Link to="/contact" className="navbar-link">
                Contact
              </Link>
            </li>
          </ul>
          <div className="lnavbar-buttons">
            <Link to="/register" className="lnavbar-btn register-btn">
              Register
            </Link>
            <Link to="/login" className="lnavbar-btn login-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}