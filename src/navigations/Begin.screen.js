import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import env from '../configs/env';

const BeginScreen = () => {
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(env.QS_MAIN);
  const [survey, setSurvey] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const totalQuestions = 82;

  useEffect(() => {
    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      const completed = answers.filter(answer => answer !== null).length;
      setCompletedCount(completed);
      setSurvey(completed > 0);  // Determine if the survey has been attempted
    }
  }, []);

  const startQuestionnaire = () => {
    navigate('/questionnaire', { state: { questionnaire } });
  };

  return (
    <div className="container">
      <h1 className="title">Survey Status</h1>
      {/* <p className="subtitle">Survey includes the following important details.</p> */}
      {completedCount==0&&<div className="card-container">
        <div className="google-button">
          <div className="number">
            {questionnaire.length}
          </div>
        </div>
        <div className="card-content">
          {survey ? 'Total Available Questions' : "Total Available Questions"}
        </div>
      </div>}
      <br />
      {completedCount!=0&&<div className="card-container">
        <div className="google-button ">
          <div className="number warning">
            {completedCount}
          </div>
        </div>
        <div className="card-content">
          Remaining Questions
        </div>
      </div>}
      <br />
      {completedCount!=0&&<div className="card-container">
        <div className="google-button">
          <div className="number warning">
            {totalQuestions - completedCount}
          </div>
        </div>
        <div className="card-content">
          Completed Questions
        </div>
      </div>}
      <br />
      <div className="button-container">
        <button onClick={startQuestionnaire} className="button button-long login-button no-underline">
          Complete the Survey
        </button>
      </div>
      {/* <p className="signup-prompt">See <Link to="/dashboard" className="signup-link">Instructions</Link></p> */}
    </div>
  );
};

export default BeginScreen;
