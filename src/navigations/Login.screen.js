import React, { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../configs/Firebase';
import Notiflix from 'notiflix';
import env from '../configs/env';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkSession = () => {
    setValue(localStorage.getItem('username'));
    if (localStorage.getItem('username') !== null) {
      // navigate('/dashboard');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const submitAction = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      Notiflix.Notify.failure('Invalid email address');
      return;
    }
    if (!validatePassword(password)) {
      Notiflix.Notify.failure('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${env.SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.student);
        console.log(result.student.status);
        localStorage.setItem('username', email);
        localStorage.setItem('passed', result.student.status);
        Notiflix.Notify.success('Login successful');

        if(result.student.status=="Passed") {
          navigate('/dashboard');
        } else {
          navigate('/quest-begin');
        }
        
      } else {
        const error = await response.json();
        Notiflix.Notify.failure(error.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Server error');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      const email = data.user.email;
      const displayName = data.user.displayName || '';
      
      try {
        const response = await fetch(`${env.SERVER_URL}/auth/google-auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, displayName }),
        });
        
        const result = await response.json();
        
        if (response.ok) {
          if (result.exists) {
            localStorage.setItem('username', email);
            localStorage.setItem('passed', result.student.status || "Not Passed");
            Notiflix.Notify.success('Login successful');
            
            if (result.student.status === "Passed") {
              navigate('/dashboard');
            } else {
              navigate('/quest-begin');
            }
          } else {
            localStorage.setItem('username', email);
            
            let firstName = '', lastName = '';
            if (displayName) {
              const nameParts = displayName.split(' ');
              firstName = nameParts[0] || '';
              lastName = nameParts.slice(1).join(' ') || '';
            }
            
            navigate('/create-account', { 
              state: { 
                fromGoogle: true,
                email: email,
                firstName: firstName,
                lastName: lastName
              } 
            });
          }
        } else {
          Notiflix.Notify.failure(result.message || 'Authentication failed');
        }
      } catch (error) {
        console.error(error);
        Notiflix.Notify.failure('Server error');
      }
    }).catch((error) => {
      console.error("Google Sign In Error:", error);
      Notiflix.Notify.failure('Google sign-in failed');
    });
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-white">
      <div className="w-full max-w-md mb-4">
        <Link 
          to="/" 
          className="text-black hover:underline inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>
      
      <div className="flex justify-center mb-6">
        <img 
          src={`${process.env.PUBLIC_URL}/images/Picturec.png`} 
          alt="SIMOnS Logo" 
          className="h-16"
        />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary mb-1">Login</h1>
          <p className="text-gray-500 text-sm">Welcome back!</p>
        </div>
        
        <form onSubmit={submitAction} className="space-y-4 mb-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-black hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-300 w-full"></div>
          <div className="bg-white px-3 text-sm text-gray-500 absolute">OR</div>
        </div>
        
        <button
          onClick={onGoogleLogin}
          className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <FaGoogle className="text-red-500 mr-2" />
          Login with Google
        </button>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/create-account" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;