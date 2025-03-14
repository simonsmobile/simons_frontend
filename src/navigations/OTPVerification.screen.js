import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import axios from 'axios';
import env from '../configs/env';

const OTPVerification = () => {
  const [otp, setOtp] = useState(localStorage.getItem('otp'));
  const [email, setEmail] = useState(localStorage.getItem('username'));
  const [code, setCode] = useState(localStorage.getItem('code'));
  const location = useLocation();
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(code === otp){
        await axios.patch(`${env.SERVER_URL}/auth/student/${email}`, { approved: true });
        Notiflix.Notify.success('OTP verified successfully!');
        navigate('/complete-account');
    } else {
        
        Notiflix.Notify.failure('Invalid OTP');
    }
  };

  return (
    <div className="container">
      <h1 className="title">OTP Verification</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="input-field"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" className="submit-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPVerification;
