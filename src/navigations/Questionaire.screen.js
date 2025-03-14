import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import env from '../configs/env';
import axios from 'axios';

const QuestionnaireScreen = () => {
  const location = useLocation();
  const { questionnaire } = location.state || { questionnaire: [] };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);

  // Initialize answers array with 82 null values if there are no saved answers
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : Array(82).fill(null);
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const selectedAnswerIndex = answers[currentQuestionIndex];
    setSelected(selectedAnswerIndex !== null && selectedAnswerIndex !== undefined);
  }, [currentQuestionIndex, answers]);

  if (!questionnaire || questionnaire.length === 0) {
    return <p>No questions available</p>;
  }

  const handleNext = () => {
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);
    setSelected(true);
  };

  const handleFinish = async () => {
    localStorage.setItem('passed', "Passed");
    await axios.patch(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}`, { status: "Passed" });
    navigate('/end-screen', { state: { answers, questionnaire } });
  };

  const currentQuestion = questionnaire[currentQuestionIndex];
  const selectedAnswerIndex = answers[currentQuestionIndex];

  return (
    <div className="container">
      <h1 className="title">Question {currentQuestionIndex + 1}</h1>
      <p className="question">{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              id={`option-${index}`}
              name="option"
              value={option}
              checked={selectedAnswerIndex === index}
              onChange={() => handleOptionChange(index)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
      <div className="navigation">
        <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
        {currentQuestionIndex < questionnaire.length - 1 ? (
          <button onClick={handleNext} disabled={!selected}>Next</button>
        ) : (
          <button onClick={handleFinish} disabled={!selected}>Finish</button>
        )}
      </div>
      <p className="progress">{currentQuestionIndex + 1} out of {questionnaire.length}</p>
    </div>
  );
};

export default QuestionnaireScreen;
