import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import env from '../configs/env';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const generateOTP = () => {
    let otp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(otp);
    localStorage.setItem('otp', otp);
  };

  const submitAction = async (event) => {
    event.preventDefault();
    setLoading(true)

    if (!validateEmail(email)) {
      Notiflix.Notify.failure('Invalid email address');
      return;
    }

    let gotp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(gotp);
    try {
      const response = await fetch(env.SERVER_URL + '/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp:gotp }),
      });

      if (response.ok) {
        setSent(true);
        setLoading(false);
        Notiflix.Notify.success('OTP was sent to your email');
      } else {
        const error = await response.json();
        setLoading(false);
        Notiflix.Notify.failure(error.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Server error');
    }
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      Notiflix.Notify.success('OTP verified');
      navigate('/reset-password', { state: { email } });
    } else {
      Notiflix.Notify.failure('Invalid OTP');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Forgot Password</h1>
      <p className="subtitle">Enter your email to reset your password</p>
      <form className="form" onSubmit={submitAction}>
        <input
          type="email"
          placeholder="EMAIL"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sent}
        />
        <button type="submit" className="submit-button" disabled={loading}>{loading ? 
        (
          <div className="loading-icon">
            <div className="spinner"></div>
          </div>
        ) 
        : 'Send OTP' }</button>
        
      </form>
      {sent && (
        <>
        <p className="or">OR</p>
        <div className='otp-container'>
          <input
              type="text"
              placeholder="Enter OTP"
              className="input-field otp-input"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className="otp-button">Submit</button>
        </div>
          
        </>
      )}
      <p className="signup-prompt">
        Remember your password? <Link to="/login" className="signup-link">Login</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordScreen;
