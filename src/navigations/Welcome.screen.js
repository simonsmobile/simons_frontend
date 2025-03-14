import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const history = useNavigate();
  const [redirectRoute, setRedirectRoute] = useState('/landing');

  useEffect(() => {
    const changeRoute = () => {
      if (localStorage.getItem('username')) {
        if (localStorage.getItem('passed') === "Passed") {
          setRedirectRoute('/dashboard');
          history('/dashboard')
        } else {
          setRedirectRoute('/quest-begin');
          history('/quest-begin')
        }
      }
    };
    changeRoute();
  }, []);

  return (
    <div className="container" style={{ backgroundImage: `${process.env.PUBLIC_URL}/imges/Background.png`, backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center' }}>
      <div className="image-container top-img">
        <img src={`${process.env.PUBLIC_URL}/images/Picturec.png`} height={80} alt="Welcome" className="top-image" />
      </div>
      <div className="image-container">
        <img src={`${process.env.PUBLIC_URL}/images/start.png`} alt="Welcome" className="welcome-image" />
      </div>
      <h1 className="title">SIMOnS Mobile {localStorage.getItem("username")}</h1>
      <p className="subtitle">
        A Self-reflection Tool for the European Digital Competence Framework for Citizens
      </p>
      <div className="button-container">
        <Link to={'/login'} className="login-button no-link">Login</Link>
        <Link to={'/create-account'} className="register-button no-link">Register</Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
