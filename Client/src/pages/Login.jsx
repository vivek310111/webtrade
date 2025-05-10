import React from 'react';
import { useState } from 'react';
import '../assets/login.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })



  const loginUser =  async (e) => {
      e.preventDefault()
      const {email, password} = data
      try {
        const response = await axios.post('/login', {
          email,
          password
        });
       

        if(response.data.error){
          toast.error(response.data.error)
        }else{
          if(response.data.token){
            localStorage.setItem('authToken', response.data.token)
            localStorage.setItem('userType', response.data.user.type) // Store user type in localStorage
            localStorage.setItem('userId', response.data.user._id) // Store user ID in localStorage

            setData({ email: '', password: '' });


          toast.success("welcome!!")
          switch (response.data.user.type) {
            case 'buy':
              window.location.replace('/home'); // Redirect buyers to the home page and clear history
              break;
            case 'sell':
              navigate('/seller/dashboard'); // Redirect sellers to the listing page
              break;
            case 'admin':
              navigate('/admin/dashboard'); // Redirect admins to the admin contact page
              break;
            default:
              navigate('/login'); // Redirect to login if type is unknown
              break;
          }
         
        }
      }
    } catch (error) {
        console.log(error)
      }

      
  }

  return (
    
        <div className="sign-in-container">
          <div className="sign-in-box">
            <h2 className="form-title">Web Trade</h2>
            <h3 className="sign-in-title">LOGIN</h3>
    
            <form className="sign-in-form" onSubmit={loginUser}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="testl@gmail.com" className="form-input"  value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
    
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="********" className="form-input"  value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
              <div className='button-div'>
              <button type="submit" className="sign-in-button"> LOGIN</button>
              </div>
            </form>
    
            <div className="register-account">
              <span>Don't have an account ?</span>
              <Link to='/register'>Create One</Link>
            </div>
          </div>
        </div>
      );
    };

