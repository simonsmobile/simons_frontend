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
      try {
        const response = await fetch(`${env.SERVER_URL}/auth/student/${email}`);
        if (response.ok) {
          const result = await response.json();
          console.log(response);
          localStorage.setItem('username', email);
          Notiflix.Notify.success('Login successful');
          navigate('/dashboard');
        } else {
          localStorage.setItem('username', email);
          navigate('/create-account');
        }
      } catch (error) {
        console.error(error);
        Notiflix.Notify.failure('Server error');
      }
    });
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="container">
      <div className="image-container top-img">
        <img src={`${process.env.PUBLIC_URL}/images/Picturec.png`} height={80} alt="Welcome" className="top-image" />
      </div>
      <h1 className="title">Login</h1>
      <p className="subtitle">Welcome back!</p>
      <form className="form" onSubmit={submitAction}>
        <input
          type="email"
          placeholder="EMAIL"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="signup-prompt">
          Forgot Password? <Link to="/forgot-password" className="signup-link">Get Help</Link>
        </p>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (
            <div className="loading-icon">
              <div className="spinner"></div>
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <p className="or">OR</p>
      <div className="social-login-container" onClick={onGoogleLogin}>
        <button className="social-button google-button">
          <FaGoogle className="icon" />
          Login with Google
        </button>
      </div>
      <p className="signup-prompt">
        Don't have an account? <Link to="/create-account" className="signup-link">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
