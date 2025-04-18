import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Notiflix from 'notiflix';
import axios from 'axios';
import env from '../configs/env';

const OTPVerification = () => {
  const [otp, setOtp] = useState(localStorage.getItem('otp'));
  const [email, setEmail] = useState(localStorage.getItem('username'));
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setLoading(true);
    const newOtp = Math.floor(10000 + Math.random() * 90000).toString();
    
    try {
      await axios.post(`${env.SERVER_URL}/auth/account-confirm`, {
        email,
        otp: newOtp
      });
      
      localStorage.setItem('otp', newOtp);
      setOtp(newOtp);
      setCanResend(false);
      setTimer(30);
      Notiflix.Notify.success('New OTP sent to your email');
    } catch (error) {
      Notiflix.Notify.failure('Failed to send new OTP');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!code) {
      Notiflix.Notify.failure('Please enter OTP');
      return;
    }
    
    setLoading(true);

    try {
      if (code === otp) {
        await axios.patch(`${env.SERVER_URL}/auth/student/${email}`, { approved: true });
        Notiflix.Notify.success('OTP verified successfully!');
        navigate('/complete-account');
      } else {
        Notiflix.Notify.failure('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-md mb-6">
        <Link 
          to="/create-account" 
          className="text-black hover:underline inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a verification code to <span className="font-medium">{email}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Verification Code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder="Enter 5-digit code"
              maxLength="5"
              className="w-full p-4 text-center text-lg tracking-widest border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOTP}
            disabled={!canResend || loading}
            className={`text-sm font-medium ${canResend ? 'text-black hover:underline' : 'text-gray-400'}`}
          >
            {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;