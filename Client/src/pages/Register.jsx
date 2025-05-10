import React, { useState } from 'react';
import '../assets/register.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
  const navigate = useNavigate()
  const [userType, setUserType] = useState({
    type: '',
  }); 

  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  })

  const handleUserTypeChange = (e) => {
    setUserType({ ...userType, type: e.target.value});
  };

  const registerUser = async(e) =>{
      e.preventDefault()
      const {name , email , password , phone} = data
      const {type} = userType
      try {
        const{data} = await axios.post('/register', {
          name, email, password, phone, type
        })
        if(data.error){
          toast.error(data.error)
        }else{
          setData({})
          setUserType({})
          toast.success('Registration Successful, Redirecting to Login Page !! ')
          navigate('/login')
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h4 className="form-title">Web Trade</h4>
        <h3 className="create-account">Create Account</h3>

        <form className="registration-form" onSubmit={registerUser}>
          <div className="looking-for">
            <label className='buy'>
              <input
                type="radio"
                value="sell"
                checked={userType.type === 'sell'}
                onChange={handleUserTypeChange}
              />
              I'm Looking to Sell
            </label>
            <label className='sell'>
              <input
                type="radio"
                value="buy"
                checked={userType.type === 'buy'}
                onChange={handleUserTypeChange}
              />
              I'm Looking to Buy
            </label>
          </div>
          
          <label htmlFor='fullName'>Full Name</label>
          <input type="text" className="form-input" id='fname' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
          <label htmlFor="Phone No. (Enter Your Country Code)">Phone No. (Enter Your Country Code)</label>
          <input type="tel" className="form-input" value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})}  />
          <label htmlFor="Email">Email</label>
          <input type="email" className="form-input" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}  />
          <label htmlFor="Password">Password</label>
          <input type="password" className="form-input" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
            <div className='button-div'>
            <button type="submit" className="create-button">Create Account</button>
          </div>
        </form>

        <div className="signin-link">
          <span>Already Have an account?</span>
        <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;