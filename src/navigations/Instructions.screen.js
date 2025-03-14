import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InstructionsScreen = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAccepted(event.target.checked);
  };

  return (
    <div className="container">
      <h1 className="title">Instructions</h1>
      <p className="subtitle w-14">
      The initial assessment contains a comprehensive set of 82 self-assessment questions. This test may takeabout 20min to complete. Therefore, you are advised to respond to all the questions with due attention so that the app suggests you take necessary learning materials corresponding to the specific area of digital competence you need to improve, based on your own self-assessment.
      </p>
      <p>Please read the following instructions carefully before.</p>
      <div className="instructions-list">
        <ol>
          <li>Dedicate appropriate time and attention for the assessment.</li>
          <li>Complete all the self-assessment questions in the survey.</li>
          <li>Do not refresh the page while taking the survey.</li>
          <li>If you encounter any issues, contact support.</li>
          <li>Review your answers before submitting the survey.</li>
        </ol>
      </div>
      <div className="checkbox-container">
        <input 
          type="checkbox" 
          id="acceptInstructions" 
          className="checkbox-input" 
          checked={isAccepted} 
          onChange={handleCheckboxChange} 
        />
        <label htmlFor="acceptInstructions" className="checkbox-label">
          I have read and accept the instructions.
        </label>
      </div>
      <div className="button-container">
        <Link 
          to={isAccepted ? "/confirmation" : "#"} 
          className={`button button-long login-button no-underline ${!isAccepted ? 'disabled' : ''}`} 
          onClick={(e) => !isAccepted && e.preventDefault()}
        >
          Next
        </Link>
      </div>
      {/* <p className="signup-prompt">Go back to <Link to="/dashboard" className="signup-link">Dashboard</Link></p> */}
    </div>
  );
};

export default InstructionsScreen;
