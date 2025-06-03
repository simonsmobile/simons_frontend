import React, { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../configs/Firebase';
import { useToast } from "../hooks/useToast";
import env from '../configs/env';

const LoginScreen = () => {
  const navigate = useNavigate();
  const toast = useToast(); 
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
      toast.error('Invalid email address');
      return;
    }
    if (!validatePassword(password)) {
      toast.error('Password must be at least 6 characters');
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
        localStorage.setItem('username', email);
        localStorage.setItem('passed', result.student.status);
        toast.success('Login successful');

        if(result.student.status=="Passed") {
          navigate('/dashboard');
        } else {
          navigate('/quest-begin');
        }
        
      } else {
        const error = await response.json();
        toast.error(error.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error');
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
            toast.success('Login successful');
            
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
          toast.error(result.message || 'Authentication failed');
        }
      } catch (error) {
        console.error(error);
        toast.error('Server error');
      }
    }).catch((error) => {
      console.error("Google Sign In Error:", error);
      toast.error('Google sign-in failed');
    });
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>
      
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-2">
        <div className="flex items-center">
          <Link to="/" className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">Login</h1>
          <div className="w-6"></div>
        </div>
      </div>
      
      <div className="flex-1 px-4 py-6 mt-12">
        
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-3 shadow-md">
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo.png`} 
              alt="SIMOnS Logo" 
              className="h-16 w-16"
            />
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Login</h1>
            <p className="text-gray-500 text-sm">Welcome back to SIMOnS!</p>
          </div>
          
          <form onSubmit={submitAction} className="space-y-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative bg-white rounded-lg shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="w-full py-4 bg-black text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
            className="w-full py-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            <FaGoogle className="mr-2" />
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
      
      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default LoginScreen;