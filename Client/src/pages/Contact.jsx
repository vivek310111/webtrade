import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/contact.css'; // Import your CSS file
import Insta from '../assets/images/insta.png'; // Import your image
import Twitter from '../assets/images/twitter.png'; // Import your image
import Navbar from '../components/Navbar';
import SellerNavbar from '../components/SellerNavbar';
import Footer from '../components/Footer';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [userType, setUserType] = useState(null); // State to store user type

  useEffect(() => {
    // Simulate fetching user type from localStorage or API
    const userTypeFromStorage = localStorage.getItem('userType'); // Example: 'seller' or 'buyer'
    setUserType(userTypeFromStorage);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', formData); // Send data to the backend
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <>
      {userType === 'sell' ? <SellerNavbar /> : <Navbar />}
      <div className="contact-container">

      <div className="contact-page">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>+91 99806534215</p>
          <p>webtrade@gmail.com</p>
          <h3>Find Us At</h3>
          <div className="social-icons">
            
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={Insta} alt="Instagram" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={Twitter} alt="" /></a>
          </div>
        </div>
        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <p>Any question or remarks? Just write us a message!</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="name-inputs">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  />
              </div>
            </div>
              <div className='contact-input'>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                />
            </div>
          </div>
            <div className="input-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit" className="send-message-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}

export default ContactForm;