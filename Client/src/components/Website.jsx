import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/website.css'; // Add your CSS file for styling
import toast from 'react-hot-toast';

function Website() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]); // State for filtered listings
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch data from the backend
    const fetchListings = async () => {
      try {
        const response = await axios.get('/listing');
        const approvedListings = response.data.filter(
          (listing) => listing.status === 'approved'
        ); // Filter only approved listings
        setFilteredListings(approvedListings); // Initialize filtered listings
        setListings(approvedListings);
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter listings based on the search query
    const filtered = listings.filter((listing) =>
      listing.websiteName.toLowerCase().includes(query)
    );
    setFilteredListings(filtered);
  };

  const handleBuyNow = (listing) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = cart.some((item) => item._id === listing._id);

    if (!isAlreadyInCart) {
      cart.push(listing);
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success(`${listing.websiteName} added to cart!`);
    } else {
      toast.error(`${listing.websiteName} is already in your cart!`);
    }
  };


  if (loading) {
    // Show a loading spinner or placeholder while data is being fetched
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading listings...</p>
      </div>
    );
  }

  return (
    <div className="website-container">
    <div className="search-and-filters">
          <input
            type="text"
            placeholder="Search "
            className="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
       {/* <div className="search-and-filters">
        <input type="text" placeholder="Search" className="search-bar" />
        <div className="filters">
          <button>Price</button>
          <button>Language</button>
          <button>Premium + Free</button>
          <button>Filters</button>
        </div> 
      </div> */}
     <div className="listings">
  {filteredListings.length > 0 ? (
    filteredListings.map((listing) => (
      <div className="listing-card" key={listing._id}>
        <div className="listing-image">
          {listing.images ? (
            <img
              src={`https://webtrade-2u21.onrender.com/${listing.images}`}
              alt={listing.websiteName}
            />
          ) : (
            <div className="placeholder">Get Premium to View.</div>
          )}
        </div>
        <div className="listing-title">
          <h3>{listing.websiteName.toUpperCase()}</h3>
          <div className="listing-details">
            <p>
              Type: <b>{listing.websiteType}</b>
            </p>
            <p>
              Industry: <b>{listing.industry}</b>
            </p>
            <p>
              Responsive: <b>{listing.isResponsive}</b>
            </p>
          </div>
        </div>
        <div className="listing-price">
          <p>Price</p>
          <h3>₹ {listing.price}</h3>
        </div>
        <div className="listing-actions">
          <div className="view-link">
            <a href={listing.websiteLink}>View website</a>
          </div>
          <button
            className="buy-now-btn"
            onClick={() => handleBuyNow(listing)}
          >
            Buy Now
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="no-listings-message">
      <p>No listings available at the moment. Please check back later!</p>
    </div>
  )}
</div>
</div>
  );
}



export default Website;