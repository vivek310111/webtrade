import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/sellerlisting.css'; // Add your CSS file for styling
import SellerNavbar from '../components/SellerNavbar'; // Assuming you have a SellerNavbar component

export default function SellerListing() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filter, setFilter] = useState('All'); // State to track the selected filter

  useEffect(() => {
    // Fetch all listings for the seller
    const fetchListings = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Get the seller's userId
            const response = await axios.get(`/listing?userId=${userId}`); // Use query parameter format
            setListings(response.data);
            setFilteredListings(response.data); // Initialize filtered listings
          } catch (error) {
            console.error('Error fetching listings:', error);
          }
        };

    fetchListings();
  }, []);

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === 'All') {
      setFilteredListings(listings);
    } else {
      setFilteredListings(listings.filter((listing) => listing.status === status.toLowerCase()));
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(`/listing/${id}`); // Delete the listing from the backend
      setListings((prevListings) => prevListings.filter((listing) => listing._id !== id)); // Remove from state
      setFilteredListings((prevListings) => prevListings.filter((listing) => listing._id !== id));
      alert('Listing deleted successfully!');
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete the listing.');
    }
  };

  return (
    <>
    <SellerNavbar />
    <div className="seller-listing-container">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
          onClick={() => handleFilterChange('All')}
          >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'Approved' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Approved')}
          >
          Approved
        </button>
        <button
          className={`filter-btn ${filter === 'Rejected' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Rejected')}
          >
          Rejected
        </button>
        <button
          className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Pending')}
          >
          Pending
        </button>
      </div>
        <h1>Your Listings</h1>
      <div className="listing-cards">
        {filteredListings.length > 0 ? (
        filteredListings.map((listing) => (
          <div className="listing-card" key={listing._id}>
            <div className="listing-image">
              <img src={`http://localhost:8000/${listing.images}`} alt={listing.websiteName} />
            </div>
            <div className="listing-details">
              <h2>
                {listing.websiteName}
              </h2>
              <p>
                <b>Type:</b> {listing.websiteType}
              </p>
              <p>
                <strong>Responsive:</strong> {listing.isResponsive}
              </p>
              <p>
                <strong>Industry:</strong> {listing.industry}
              </p>
            </div>
            <div className="listing-actions">
              <button
                className="delete-btn"
                onClick={() => handleDeleteListing(listing._id)}
                >
                🗑️ Delete
              </button>
              <a
                href={listing.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
                >
                👁️ View
              </a>
            </div>

          </div>
        ))
    ) : (
        <div className="no-listings-message">No listings available.</div>
        )}
      </div>
    </div>
</>
  );
}