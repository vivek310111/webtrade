import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/manageListing.css'; // Import the CSS file for styling
import AdminNavbar from '../components/AdminNavbar';

export default function ManageListing() {
  const [listings, setListings] = useState([]);

  // Fetch all listings from the backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/listing/pending'); // Replace with your API endpoint
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  // Handle Approve
  const handleApprove = async (id) => {
    try {
      await axios.put(`/listing/${id}`, { status: 'approved' }); // Update status to approved
      alert('Listing approved!');
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== id) // Remove the approved listing from the list
      );
    } catch (error) {
      console.error('Error approving listing:', error);
    }
  };

  // Handle Reject
  const handleReject = async (id) => {
    try {
      await axios.put(`/listing/${id}`, { status: 'rejected' }); // Update status to rejected
      alert('Listing rejected!');
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== id)
      );
    } catch (error) {
      console.error('Error rejecting listing:', error);
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="manage-listing-container">
      <h1>Product Testing Details</h1>

      <div className="listing-cards">
        {listings.map((listing) => (
          <div className="listing-card" key={listing._id}>
            <div className="listing-image">
              <img src={`http://localhost:8000/${listing.images}`} alt={listing.websiteName} />
            </div>
            <div className="listing-details">
              <h2>
                {listing.websiteName}
              </h2>
              <p>
                <strong>Type:</strong> {listing.websiteType}
              </p>
              <p>
                <strong>Userid:</strong> #{listing.userId.slice(-5)}
              </p>
              <p>
                <strong>Websiteid:</strong> #{listing._id.slice(-3)}
              </p>
              <p>
                <strong>Responsive:</strong> {listing.isResponsive}
              </p>
              <p>
                <strong>Industry:</strong> {listing.industry}
              </p>
            </div>
            <div className="listing-actions-grid">
             <button
                className="approve-btn"
                onClick={() => handleApprove(listing._id)}
              >
                ✅ Approve
            </button>
            <button
                className="reject-btn"
                onClick={() => handleReject(listing._id)}
            >
                ❌ Reject
            </button>
            <a
                href={listing.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
            >
                🔗 View
            </a>
            <a
                href={`/${listing.sourceCode}`}
                download
                className="source-code-btn"
            >
                📁 Source code
            </a>
            </div>
          </div>
        ))}
      </div>
    </div>
</>
  );
}