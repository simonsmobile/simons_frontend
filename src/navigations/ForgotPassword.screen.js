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
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const generateOTP = () => {
    let otp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(otp);
    localStorage.setItem('otp', otp);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const submitAction = async (event) => {
    event.preventDefault();
    
    if (!validateEmail(email)) {
      Notiflix.Notify.failure('Invalid email address');
      return;
    }

    setLoading(true);

    let gotp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(gotp);
    try {
      const response = await fetch(env.SERVER_URL + '/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: gotp }),
      });

      if (response.ok) {
        setSent(true);
        generateOTP();
        Notiflix.Notify.success('OTP was sent to your email');
      } else {
        const error = await response.json();
        Notiflix.Notify.failure(error.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Server error');
    } finally {
      setLoading(false);
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

  const handleResendOTP = async () => {
    if (timer > 0) return;
    
    setLoading(true);
    let newOtp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(newOtp);
    
    try {
      const response = await fetch(env.SERVER_URL + '/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: newOtp }),
      });

      if (response.ok) {
        generateOTP();
        Notiflix.Notify.success('New OTP was sent to your email');
      } else {
        const error = await response.json();
        Notiflix.Notify.failure(error.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center">
          <Link to="/login" className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">Forgot Password</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Forgot Your Password?</h2>
            <p className="text-gray-600 text-sm">
              {!sent 
                ? "Enter your email below and we'll send you a verification code to reset your password." 
                : `We've sent a verification code to ${email}`
              }
            </p>
          </div>

          {!sent ? (
            <form onSubmit={submitAction} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  'Send Verification Code'
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 5-digit code"
                  maxLength="5"
                  className="w-full p-3 text-center text-lg tracking-widest border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              
              <button
                onClick={verifyOtp}
                className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
              >
                Verify Code
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Didn't receive the code?</p>
                <button
                  onClick={handleResendOTP}
                  disabled={timer > 0 || loading}
                  className={`text-sm font-medium ${timer > 0 ? 'text-gray-400' : 'text-black hover:underline'}`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                </button>
              </div>
            </div>
          )}
          
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Remember your password?{' '}
              <Link to="/login" className="text-black font-medium hover:underline">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;