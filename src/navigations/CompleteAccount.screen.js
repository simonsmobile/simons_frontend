import React from 'react';
import { FaNetworkWired } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const CompleteAccountScreen = () => {
  // const navigate = useNavigate();

  

  return (
    <div className="container">
      
      <h1 className="title">Account Completed</h1>
      <p className="subtitle">
        Your Account creation process is completed. See Instructions. 
      </p>
      {/* <div className="card-container">
        <div className='google-button'>
          <FaNetworkWired className="icon" />
        </div>
        <div className='card-content'>
          Haven't Attempted Survey yet!
        </div>
      </div> */}
      <br></br>
      <div className="button-container">
        <Link to="/instructions" className="button button-long login-button no-underline">Instructions</Link>
      </div>
      {/* <p className="signup-prompt">To <Link to="/" className="signup-link">Go Back</Link></p> */}
    </div>
  );
};

export default CompleteAccountScreen;
