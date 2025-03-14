import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import env from '../configs/env';
import axios from 'axios';

const SubQuestionnaireScreen = () => {
  
  const location = useLocation();
  const { index, level, category, sub } = location.state;
  console.log(level + '|' + sub.category+ '|' + category)

  const getFilteredRandomQuestions = (questionnaire, level, type) => {
    // Filter questions based on level and type
    const filteredQuestions = questionnaire.filter(
      (q) => q.level === level && q.type === type
    );

    // Shuffle the filtered questions
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());

    // Return the first three items
    return shuffled.slice(0, 3);
  };

  const [questionnaire, setQuestionaire] = useState(getFilteredRandomQuestions(
    env.QS_SAMPLE2,
    level,
    sub.category
  ));

  // const [questionnaire, setQuestionaire] = useState(getThreeRandomQuestions(env.QS_SAMPLE2));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);

  // Initialize answers array with 82 null values if there are no saved answers
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('sub_answers');
    return savedAnswers ? JSON.parse(savedAnswers) : Array(questionnaire.length).fill(null);
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('sub_answers', JSON.stringify(answers));
    
  }, [answers, index]);

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
    // await axios.patch(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}`, { status: "Passed" });
    localStorage.setItem('passed', "Passed");
    navigate('/sub-end-screen', { state: { answers, questionnaire, subIndex: index, category, level, sub } });
  };

  const currentQuestion = questionnaire[currentQuestionIndex];
  const selectedAnswerIndex = answers[currentQuestionIndex];

  return (
    <div className="container">
        <span className='simple-heading'>[{level.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"}]</span>
        <h1 className="title">{category}</h1>
        {sub&&<small>{sub.category} - {sub.title}</small>}
        <br></br>
      <h1 className="title"> Question {currentQuestionIndex + 1}</h1>
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

export default SubQuestionnaireScreen;
