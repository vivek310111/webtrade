import React from 'react';
import './Footer.css'; // Import the CSS file
import instaIcon from '../assets/images/insta.png';
import twitterIcon from '../assets/images/twitter.png';


function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Reach Us</h4>
          <div className="footer-contact-information">
            <p>
              <span className="icon">📞</span> +91 9960534215
            </p>
            <p>
              <span className="icon">📧</span> Webtrade@gmail.com
            </p>
            <div className='footer-social'>
            <img src={instaIcon} alt=""  className='insta'/>
            <img src={twitterIcon} alt="" className='twitter'/>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Services</a></li>
            <li><a href="/terms-of-use">Terms of Use</a></li>
            <li><a href="/refund">Refund Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Web Trade. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;