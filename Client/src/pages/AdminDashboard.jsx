import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/adminDashboard.css'; // Import the CSS file for styling
import AdminNavbar from '../components/AdminNavbar'; // Import the AdminNavbar component
import yourListing from '../assets/images/yourlisting.png';
import report from '../assets/images/report.png';
import inquiry from '../assets/images/inquiry.png';


export default function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="a-dashboard-container">
        <div className="a-dashboard-grid">
          {/* Seller Listings Card */}
          <Link to="/admin/manage-listings" className="a-dashboard-card">
          <div >
            <div className="a-card-icon">
              <img src={yourListing} alt="Seller Listings" />
            </div>
            <h2>Seller Listings</h2>
            <p>Seller Listings Will Be Displayed Here</p>
          </div>
          </Link>

          {/* View Reports Card */}
            <Link to="/admin/reports" className="a-dashboard-card">
          <div>
            <div className="a-card-icon">
              <img src={report} alt="View Reports" />
            </div>
            <h2>View Reports</h2>
            <p>Reports Can be Viewed from here</p>
          </div>
            </Link>

          {/* Order Details Card */}
            <Link to="/admin/orders" className="a-dashboard-card">
          <div>
            <div className="a-card-icon">
              <img src={order} alt="Order Details" />
            </div>
            <h2>Order Details</h2>
            <p>Access Order Information</p>
          </div>
            </Link>

          {/* User Inquiries Card */}
          <Link to="/admin/contact" className="a-dashboard-card">
          <div>
            <div className="a-card-icon">
              <img src={inquiry} alt="User Inquiries" />
            </div>
            <h2>User Inquiries</h2>
            <p>User Inquiries Will Be Displayed Here</p>
          </div>
          </Link>
        </div>
      </div>
    </>
  );
}