import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Notiflix from 'notiflix';
import axios from 'axios';
import env from '../configs/env';

const OTPVerification = () => {
  const [otp, setOtp] = useState(localStorage.getItem('otp'));
  const [email, setEmail] = useState(localStorage.getItem('username'));
  const [inputOTP, setInputOTP] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleInputChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOTP = [...inputOTP];
    newOTP[index] = value;
    setInputOTP(newOTP);

    if (value.length === 1 && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (inputOTP[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    if (/^\d+$/.test(pastedData) && pastedData.length <= 5) {
      const digits = pastedData.split('');
      const newOTP = [...inputOTP];

      digits.forEach((digit, index) => {
        if (index < 5) {
          newOTP[index] = digit;
        }
      });

      setInputOTP(newOTP);

      if (digits.length < 5 && inputRefs.current[digits.length]) {
        inputRefs.current[digits.length].focus();
      }
    }
  };

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

      setInputOTP(['', '', '', '', '']);

      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }

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

    const enteredOTP = inputOTP.join('');

    if (enteredOTP.length !== 5) {
      Notiflix.Notify.failure('Please enter a complete 5-digit OTP');
      return;
    }

    setLoading(true);

    try {
      if (enteredOTP === otp) {
        await axios.patch(`${env.SERVER_URL}/auth/student/${email}`, { approved: true });
        Notiflix.Notify.success('OTP verified successfully!');
        navigate('/complete-account');
      } else {
        Notiflix.Notify.failure('Invalid OTP');

        inputRefs.current.forEach(input => {
          if (input) {
            input.classList.add('animate-shake');
            setTimeout(() => {
              input.classList.remove('animate-shake');
            }, 500);
          }
        });
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top design element */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center">
          <Link to="/create-account" className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">Verify Email</h1>
          <div className="w-6"></div>
        </div>
      </div>
      <div className="flex-1 px-4 py-6 mt-12 w-full max-w-md mx-auto">

        <div className="flex justify-center mb-8">
          <div className="bg-amber-100 rounded-full p-4 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a verification code to <br />
            <span className="font-medium text-black">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter Verification Code
            </label>

            <div className="flex justify-center space-x-2 mb-2">
              {inputOTP.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              ))}
            </div>

            <div className="flex justify-center">
              <div className="h-1 bg-gray-200 w-1/2 rounded-full mt-2">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (inputOTP.filter(d => d !== '').length / 5) * 100)}%` }}
                ></div>
              </div>
            </div>
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
            className={`text-sm font-medium inline-flex items-center ${canResend ? 'text-black hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
          >
            {!canResend && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
          </button>
        </div>
      </div>

      {/* Bottom design element */}
      <div className="w-full relative mt-8">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>

      {/* Add shake animation for invalid OTP */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default OTPVerification;
