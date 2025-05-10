import React, { useState } from "react";
import Footer from "../components/Footer";
import "../assets/about.css";
import { Link } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";

// Import images
import sellerImage from "../assets/images/landing_seller.png";
import buyerImage from "../assets/images/landing_buyer.png";

export default function About() {
  const [isSelling, setIsSelling] = useState(false);

  return (
    <>
      <LandingNavbar />
      <div className="page-title">
        <span> Welcome to webTrade</span>
      </div>
      <div className="switch">
        <div className="switch-background">
          <div className={`slider ${isSelling ? "sell" : "buy"}`}></div>
          <button
            className={isSelling ? "active" : ""}
            onClick={() => setIsSelling(true)}
          >
            I'm looking to Sell
          </button>
          <button
            className={!isSelling ? "active" : ""}
            onClick={() => setIsSelling(false)}
          >
            I'm looking to Buy
          </button>
        </div>
      </div>

      <div className="about-container">
        {isSelling ? (
          <>
            <div className="about-content">
              <div className="about-left">
                <div className="about-header">
                  <h1>Effortlessly Sell Your Websites with Webtrade</h1>
                  <h3>
                    Providing Freelancers and Web Enthusiasts A Powerful Platform To
                    Showcase Their Talent And Sell Websites With Ease Like Never Before.
                  </h3>
                </div>
                <ul>
                  <li>
                    <b>🌍 Get Discovered </b> – Your websites are showcased to a niche audience that values clean, high-performance code.
                  </li>
                  <li>
                    <b>💰 Earn Instantly </b> – No subscription-based pricing—just a one-time payment per sale.
                  </li>
                  <li>
                    <b>📊 Dedicated Dashboard </b> for in-depth analytics and valuable insights.
                  </li>
                  <li>
                    <b>🛠 Monetize Your Work </b> – Turn your completed projects into passive income.
                  </li>
                  <li>
                    <b>💲Set Your Own Prices </b> – You have full control over your pricing and earnings.
                  </li>
                </ul>
              </div>
              <div className="about-right">
                <img
                  src={sellerImage} // Use imported image
                  alt="Webtrade Example"
                  className="about-image"
                />
              </div>
            </div>

            <div className="about-selling">
              <h2>Selling is Simple & Rewarding!</h2>
              <ul>
                <li>List Your Website 📝 – Create an account and upload your hard-coded site.</li>
                <li>Set Your Price 💵 – Choose a fair price based on your site's quality and features.</li>
                <li>Make Sales & Earn 🎉 – Every purchase puts money in your pocket!</li>
                <li>Connect with Buyers 👥 – Get discovered by businesses, entrepreneurs, and creators.</li>
              </ul>
              <Link to="/register">
                <button className="start-selling-btn">Start Selling Now</button>
              </Link>
            </div>

            <div className="about-help">
              <h4>Need help?</h4>
              <p>
                We know that buying or selling a digital business can be challenging. If you need any help, feel free to reach out anytime!
              </p>
              <a href="/contact" className="contact-link">
                Contact Us
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="about-content">
              <div className="about-left">
                <div className="about-header">
                  <h1>Webtrade - The Marketplace for High Performance Hard-Coded Websites.</h1>
                  <h3>
                    Websites that are fast, reliable, and fully controllable for businesses, creators, and entrepreneurs, that require beautifully designed, hard-coded customizable solutions for any need.
                  </h3>
                </div>
                <ul>
                  <li>🚀 Websites that load instantly, ensuring a smooth and seamless user experience.</li>
                  <li>🛠️ Every line of code is yours, customize according to your personal needs and deploy without limits.</li>
                  <li>📊 Dedicated dashboard for in-depth analytics and valuable insights.</li>
                  <li>📈 Clean code means better search engine indexing and improved rankings.</li>
                </ul>
              </div>
              <div className="about-right">
                <img
                  src={buyerImage} // Use imported image
                  alt="Webtrade Example"
                  className="about-image"
                />
              </div>
            </div>

            <div className="about-selling">
              <h2>Getting Your Website is Easy!</h2>
              <ul>
                <li>Explore 🔍 – Browse our marketplace for stunning, hard-coded websites.</li>
                <li>Choose & Buy 💳 – Select the perfect website for your needs and purchase it instantly.</li>
                <li>Download & Launch 🚀 – Get full access to the source code and deploy your website.</li>
                <li>Customize & Grow 🎨 – Modify the code as needed and scale your business with confidence!</li>
              </ul>
              <Link to="/home">
                <button className="start-selling-btn">Browse Websites</button>
              </Link>
            </div>

            <div className="about-help">
              <h4>Need help?</h4>
              <p>
                We know that buying or selling a digital business can be challenging. If you need any help, feel free to reach out anytime!
              </p>
              <a href="/contact" className="contact-link">
                Contact Us
              </a>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}