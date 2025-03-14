import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import env from '../configs/env';
import axios from 'axios';

const EndScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], questionnaire = [] } = location.state || {};
  const [grades, setGrades ] = useState(['F', 'F', 'F', 'F', 'F']);
  const [gradesType, setGradesType ] = useState([
    '1.1',
    '1.2',
    '1.3',
    '2.1',
    '2.2',
    '2.3',
    '2.4',
    '2.5',
    '2.6',
    '3.1',
    '3.2',
    '3.3',
    '3.4',
    '4.1',
    '4.2',
    '4.3',
    '4.4',
    '5.1',
    '5.2',
    '5.3',
    '5.4'
  ]);
  const completedCount = answers.filter(answer => answer !== null).length;

  const startQuestionnaire = () => {
    navigate('/dashboard');
  };

  const calculateMarks = async (qs, answers) => {
    if (qs.length !== answers.length) {
      console.error("Questionnaire and answers must have the same length!");
      return;
    }
  
    let pointsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let marks = [4*4, 4*4, 4*4, 4*4, 4*4, 4*4, 4*3, 4*4, 4*4, 4*4, 4*4, 4*4, 4*4, 4*4, 4*5, 4*3, 4*4, 4*4, 4*4, 4*3, 4*4];
    let updatedGrades = ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'];
  
    for (let i = 0; i < qs.length; i++) {
      // Add 1 to each non-null answer, or replace null with 0
      let answerValue = answers[i] !== null ? answers[i] + 1 : 0;
      
      // Get the point value from the questionnaire
      let full = qs[i].points;
  
      // Add the answer value to the corresponding category in the pointsArray
      if (full === 1.1) {
        pointsArray[0] += answerValue;
      } else if (full === 1.2) {
        pointsArray[1] += answerValue;
      } else if (full === 1.3) {
        pointsArray[2] += answerValue;
      } else if (full === 2.1) {
        pointsArray[3] += answerValue;
      } else if (full === 2.2) {
        pointsArray[4] += answerValue;
      } else if (full === 2.3) {
        pointsArray[5] += answerValue;
      } else if (full === 2.4) {
        pointsArray[6] += answerValue;
      } else if (full === 2.5) {
        pointsArray[7] += answerValue;
      } else if (full === 2.6) {
        pointsArray[8] += answerValue;
      } else if (full === 3.1) {
        pointsArray[9] += answerValue;
      } else if (full === 3.2) {
        pointsArray[10] += answerValue;
      } else if (full === 3.3) {
        pointsArray[11] += answerValue;
      } else if (full === 3.4) {
        pointsArray[12] += answerValue;
      } else if (full === 4.1) {
        pointsArray[13] += answerValue;
      } else if (full === 4.2) {
        pointsArray[14] += answerValue;
      } else if (full === 4.3) {
        pointsArray[15] += answerValue;
      } else if (full === 4.4) {
        pointsArray[16] += answerValue;
      } else if (full === 5.1) {
        pointsArray[17] += answerValue;
      } else if (full === 5.2) {
        pointsArray[18] += answerValue;
      } else if (full === 5.3) {
        pointsArray[19] += answerValue;
      } else if (full === 5.4) {
        pointsArray[20] += answerValue;
      } 
    }

    console.log(pointsArray)
  
    // Calculate the grade for each category
    for (let i = 0; i < pointsArray.length; i++) {
      let score = 100 * pointsArray[i] / marks[i];
      console.log(score);
      if (score >= 80) {
        updatedGrades[i] = 'M';  
        // if(i==0) updatedGrades[i] = 'B';
      } else if (score < 80) {
        updatedGrades[i] = 'B';  
      }
    }
  
    // Update the grades state
    setGrades(updatedGrades);
  
    console.log("Points Array:", pointsArray);
    console.log("Updated Grades:", updatedGrades);

    // Update DB
    await axios.post(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}/tests`, { 
      date: new Date().toISOString().split('T')[0],
      questions: qs,
      answers,
      grades: updatedGrades,
      points: pointsArray
    });
  
    return updatedGrades; 
  };

  useEffect(() => {
    calculateMarks(questionnaire, answers);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Survey Completion</h1>
      <div className="card-container">
        <div className="google-button">
          <div className="number">
            {completedCount}
          </div>
        </div>
        {/* <div className="card-content">
          You have completed {completedCount} out of {questionnaire.length} questions!
        </div> */}
        <div className="card-content">
          You have completed all questions!
        </div>
      </div>
      <br/>
      {/* <div className="results-container">
          <h3>Results</h3>
          <div className="result-row">
            {grades.map((result, index) => (
              <div key={index} className="result-box">
                <span className="result-letter">{result}</span>
              </div>
            ))}
          </div>
          <div className="caption-row">
            {gradesType.map((category, index) => (
              <div key={index} className="category-caption">
                <span>{category}</span>
              </div>
            ))}
          </div>
      </div> */}
      <div className="button-container">
        <button onClick={startQuestionnaire} className="button button-long login-button no-underline">
          Proceed to Dashboard
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
