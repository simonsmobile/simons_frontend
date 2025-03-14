import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import env from '../configs/env';
import axios from 'axios';

const SubEndScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], questionnaire = [], category, level, sub, subIndex } = location.state || {};
  const [grades, setGrades ] = useState(['F', 'F', 'F', 'F', 'F']);
  const [isPass, setPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [gradesType, setGradesType ] = useState([
    'Information & Data Literacy',
    'Com. & Collaboration',
    'Digital Content Creation',
    'Safety',
    'Problem Solving'
  ]);
  const completedCount = answers.filter(answer => answer !== null).length;
  console.log(answers)
  console.log(questionnaire)

  const correctCount = questionnaire.reduce((count, q, index) => {
    const selectedOption = q.options[answers[index]]; // Get the selected option value
    return selectedOption === q.answer ? count + 1 : count; // Increment count if correct
  }, 0);
  
  const getIdByTitle = (title) => {
    const item = env.QS_CAT.find((category) => category.title === title);
    return item ? item.id : null; 
  };

  const startQuestionnaire = () => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      localStorage.removeItem('sub_answers');
      navigate('/dashboard');
      setLoading(false); // Hide spinner after navigation
    }, 5000);
  };

  const handleNavigation = (index, level, category, sub) => {
    navigate('/study', { state: { index, level, category, sub } });
  };

  const retrievePrevious = async (qs, answers) => {
    try {
        const response = await fetch(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}/tests`);
        const data = await response.json();

        if (data) {
          const originalResults = data.firstTest?.grades || [];
          const progressResults = data.lastTest?.grades || originalResults;

          console.log("DATA",progressResults);

          calculateMarks(qs, answers, progressResults);
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
  }

  const calculateMarks = async (qs, answers, prev) => {
    console.log(qs);
    console.log(answers);
    // if (qs.length !== answers.length) {
    //   console.error("Questionnaire and answers must have the same length!");
    //   return;
    // }
  
    let pointsArray = [0, 0, 0, 0, 0];
    let marks = 4*qs.length;
    let updatedGrades = prev || ['F', 'F', 'F', 'F', 'F'];
    console.log('CURRENT', category)
    let current = sub?getIdByTitle(sub.title):0
    console.log(current)
    let pointValue = 0;
    console.log('CURRENT', current)
    if(current||current==0) {
      pointValue = pointsArray[current];
    } 
    console.log('CURRENT', current)
  
    
    let score = (correctCount / completedCount);
    
    if (score == 1) {
      setPass(true)
      if(level=="basic"){
        updatedGrades[current] = "M"
        
      } else if(level=="master") {
        updatedGrades[current] = "C"
      }
    } 
    console.log("F2", updatedGrades[current])
    console.log("F2", current)
      
  
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
    retrievePrevious(questionnaire, answers);
  }, []);

  return (
    <div className="container">
      <span className='simple-heading'>[{level.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"}]</span>
      <h1 className="title">{category}</h1>
      {sub&&<small>{sub.category} - {sub.title}</small>}
      
      <br/>
      <div className="results-container">
          <h3>Results {isPass?<b className='ft-success'>- Passed</b>:<b className='ft-danger'>- Re Attempt</b>}</h3>
          
          <div className="card-container">
            <div className="google-button">
              <div className="number">
                {correctCount}/{completedCount}
              </div>
            </div>
            {/* <div className="card-content">
              You have completed {completedCount} out of {questionnaire.length} questions!
            </div> */}
            <div className="card-content">
              Correct Answers
            </div>
          </div>
          <br></br>
          <div className="card-container">
            <div className="google-button">
              <div className="number">
                {completedCount-correctCount}/{completedCount}
              </div>
            </div>
            {/* <div className="card-content">
              You have completed {completedCount} out of {questionnaire.length} questions!
            </div> */}
            <div className="card-content">
              Incorrect Answers
            </div>
          </div>
      </div>
      <div className="button-container">
        {(!isPass)&&<button onClick={() => handleNavigation(subIndex, level, category, sub)} className="button button-long login-button no-underline">
          Back to Learning
        </button>}
      </div>
      <br></br>
      <div className="button-container">
        <button onClick={startQuestionnaire} className="button button-long login-button no-underline" disabled={loading}>
        {loading ? (
          <div className="loading-icon">
            <div className="spinner"></div>
          </div>
        ) : 'Proceed to Dashboard'}
      </button>
      </div>

    </div>
  );
};

export default SubEndScreen;
