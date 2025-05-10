import React, { useState } from "react";
import "../assets/pricing.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Pricing = () => {
    const [isMonthly, setIsMonthly] = useState(true);
   

  return (
    <>
    <Navbar />
    <div className="pricing-container">
        <div className="title">
      <h2>Simple, transparent pricing</h2>
      <p>No contracts. No surprise fees.</p>
     </div>
      <div className="toggle-switch">
        <div className="toggle-background">
     <div className={`toggle-slider ${isMonthly ? "monthly" : "yearly"}`}></div>        
     <button
          className={isMonthly ? "active" : ""}
          onClick={() => setIsMonthly(true)}
          >
          MONTHLY
        </button>
        <button
          className={!isMonthly ? "active" : ""}
          onClick={() => setIsMonthly(false)}
          >
          YEARLY
        </button>
            </div>
      </div>

      <div className="pricing-cards">

        <div className="feature-card">
            <ul>
            <li> Standard Reach</li>
            <li> Early Access of the Listed Website</li>
            <li> Open For Negotiation</li>
            <li> AI Personalized Website</li>
            <li> Instant Approval</li>
            </ul>
        </div>
        <div className="card">
          <h3>Starter</h3>
          <p>FREE</p>
          <ul>
            <li className="tick">&#10003;</li>
            <li className="cross">&#10007;</li>
            <li className="cross">&#10007;</li>
            <li className="tick">&#10003;</li>
            <li className="cross">&#10007;</li>
          </ul>
          <Link to="/home">
          <button>Choose plan</button>
          </Link>
        </div>
        <div className="card">
          <h3>Pro</h3>
          <p>
            {isMonthly?<p><b className="price">₹500</b>/Month</p>:<p><b className="price">₹5000</b>/Year</p>}
          </p>
          <ul>
            <li className="tick">&#10003; </li>
            <li className="tick">&#10003; </li>
            <li className="tick">&#10003; </li>
            <li className="tick">&#10003; </li>
            <li className="tick">&#10003; </li>
          </ul>
          <button>Choose plan</button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Pricing;
