import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Website from '../components/Website';
import { useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../assets/home.css'; // Add your CSS file for styling

export default function Home() {
  const navigate = useNavigate(); // For navigation after logout
  const hasShownToast = useRef(false); // Ref to track if the toast has already been shown


  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Check if the user is authenticated
    if (!authToken) {
      navigate("/login"); // Redirect to login if not authenticated
      if (!hasShownToast.current) {
        toast.error('Please login to continue'); // Show error message only once
        hasShownToast.current = true; // Mark the toast as shown
      }
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="home">
        <Website />
      </div>
      <Footer />
    </>
  );
}