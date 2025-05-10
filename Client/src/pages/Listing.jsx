import React, { useState } from 'react';
import SellerNavbar from '../components/SellerNavbar';
import Footer from '../components/Footer';
import '../assets/listing.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Listing() {
  const [formData, setFormData] = useState({
    websiteName: '',
    industry: '',
    price: '',
    websiteType: 'Ecommerce',
    isResponsive: '',
    images: null,
    sourceCode: null,
    websiteLink: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const userId = localStorage.getItem('userId');
    if (userId) {
      formDataToSend.append('userId', userId);
    } else {
      alert('User is not logged in.');
      return;
    }

    try {
      const response = await axios.post('/listing', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Form submitted successfully:', response.data);
      //  Show success message to the user
      toast.success('Listing created successfully!');
      // Redirect to the seller dashboard after successful submission
      navigate('/seller/dashboard'); 
      // Reset form data after successful submission
      setFormData({
        websiteName: '',
        industry: '',
        price: '',
        websiteType: 'Ecommerce',
        isResponsive: '',
        images: null,
        sourceCode: null,
        websiteLink: '',
        userId: localStorage.getItem('userId') || '', 
      });
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to submit the listing. Please try again.');
    }
  };

  return (
    <>
      <SellerNavbar />
        <h1 className='listing-title'>Start Listing Your Website Now!!!</h1>
      <div className="listing-container">
        <form className="listing-form" onSubmit={handleSubmit}>
          <div className="listing-group">
            <label htmlFor="websiteName">Website Name</label>
            <input
              type="text"
              id="websiteName"
              name="websiteName"
              value={formData.websiteName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="listing-group">
            <label htmlFor="industry">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </div>
          <div className="listing-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="listing-group">
            <label htmlFor="websiteType">Select Your Website Type</label>
            <select
              id="websiteType"
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
              required
            >
              <option value="Ecommerce">Ecommerce</option>
              <option value="Static One Pager">Static One Pager</option>
              <option value="Two Pager">Two Pager</option>
            </select>
          </div>
          <div className="listing-group">
            <label>Is your Website Responsive?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  className='yesrad'
                  name="isResponsive"
                  value="Yes"
                  checked={formData.isResponsive === 'Yes'}
                  onChange={handleChange}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  className='norad'
                  name="isResponsive"
                  value="No"
                  checked={formData.isResponsive === 'No'}
                  onChange={handleChange}
                  required
                />
                No
              </label>
            </div>
          </div>
          <div className="listing-group">
            <label>Please upload 1 image, size less than 100KB</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="listing-group">
            <label>Please upload your website source code (ZIP file)</label>
            <input
              type="file"
              name="sourceCode"
              accept=".zip"
              onChange={handleChange}
              required
            />
          </div>

          <div className="link-group">
            <label htmlFor="websiteLink">Website Link</label>
            <input
              type="url"
              id="websiteLink"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Start Listing</button>
        </form>
      </div>
      <Footer />
    </>
  );
}