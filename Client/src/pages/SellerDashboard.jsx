import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/sellerdashboard.css'; // Import the CSS file for styling
import SellerNavbar from '../components/SellerNavbar'; // Assuming you have a SellerNavbar component
import sellerListing from '../assets/images/yourlisting.png';
import sales from '../assets/images/sales.png';


export default function SellerDashboard() {
  return (
    <>
      <SellerNavbar />
      <div className="seller-dashboard-container">
        <div className="dashboard-cards">
          {/* Your Listings Card */}
          <Link to="/seller/your-listings" className="dashboard-card">
          <div>
            <img src={sellerListing} alt="" />
            <h2>Your Listings</h2>
            <p>Manage all your listings and check whether they get approved or not.</p>
          </div>
          </Link>

          {/* Manage Sales Card */}
          <Link to="/seller/sales" className="dashboard-card"> 
          <div>
            <img src={sales} alt="" />
            <h2>Manage Sales</h2>
            <p>All your orders in one place — manage with ease.</p>
          </div>
          </Link>
        </div>

        {/* Start Listing Button */}
        <div className="start-listing">
          <Link to="/seller/listing" className="start-listing-btn">
            Start Listing
          </Link>
        </div>
      </div>
    </>
  );
}