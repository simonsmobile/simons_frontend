import React, { useState } from 'react';
import { AiFillFileMarkdown, AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaDoorOpen, FaLock } from "react-icons/fa";

const ProgressTracker = ({ results }) => {
  console.log(results)
  const categories = [
    'Information & Data Literacy',
    'Com. & Collaboration',
    'Digital Content Creation',
    'Safety',
    'Problem Solving',
  ];

  const [gradesType] = useState([
    { id:0, category: '1.1', title: 'Browsing, searching and filtering data, information and digital content', mainCategory: 'Information & Data Literacy' },
    { id:1, category: '1.2', title: 'Evaluating data, information and digital content', mainCategory: 'Information & Data Literacy' },
    { id:2, category: '1.3', title: 'Managing data, information and digital content', mainCategory: 'Information & Data Literacy' },
    { id:3, category: '2.1', title: 'Interacting through digital technologies', mainCategory: 'Com. & Collaboration' },
    { id:4, category: '2.2', title: 'Sharing information and content through digital technologies', mainCategory: 'Com. & Collaboration' },
    { id:5, category: '2.3', title: 'Engaging in citizenship through digital technologies', mainCategory: 'Com. & Collaboration' },
    { id:6, category: '2.4', title: 'Collaborating through digital technologies', mainCategory: 'Com. & Collaboration' },
    { id:7, category: '2.5', title: 'Netiquette', mainCategory: 'Com. & Collaboration' },
    { id:8, category: '2.6', title: 'Managing digital identity', mainCategory: 'Com. & Collaboration' },
    { id:9, category: '3.1', title: 'Developing digital content', mainCategory: 'Digital Content Creation' },
    { id:10, category: '3.2', title: 'Integrating and re-elaborating digital content', mainCategory: 'Digital Content Creation' },
    { id:11, category: '3.3', title: 'Copyright and licenses', mainCategory: 'Digital Content Creation' },
    { id:12, category: '3.4', title: 'Programming', mainCategory: 'Digital Content Creation' },
    { id:13, category: '4.1', title: 'Protecting devices', mainCategory: 'Safety' },
    { id:14, category: '4.2', title: 'Protecting personal data and privacy', mainCategory: 'Safety' },
    { id:15, category: '4.3', title: 'Protecting health and well-being', mainCategory: 'Safety' },
    { id:16, category: '4.4', title: 'Protecting the environment', mainCategory: 'Safety' },
    { id:17, category: '5.1', title: 'Solving technical problems', mainCategory: 'Problem Solving' },
    { id:18, category: '5.2', title: 'Identifying needs and technological responses', mainCategory: 'Problem Solving' },
    { id:19, category: '5.3', title: 'Creatively using digital technologies', mainCategory: 'Problem Solving' },
    { id:20, category: '5.4', title: 'Identifying digital competence gaps', mainCategory: 'Problem Solving' },
  ]);

  const navigate = useNavigate();

  const handleNavigation = (index, level, category, sub) => {
    navigate('/study', { state: { index, level, category, sub } });
  };

  const isMatch = JSON.stringify(results) === JSON.stringify(['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C']);

  return (
    <div className="progress-tracker">
      <h1 className="title">Progress Tracker</h1>
      <table className="progress-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Foundation / Intermediate</th>
            <th>Advanced / Highly Specialized</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="category-name" colSpan={2}>
                  <strong>{category}</strong>
                </td>
                <td colSpan="2"></td>
              </tr>
              {gradesType
                .filter((grade) => grade.mainCategory === category)
                .map((grade, gradeIndex) => (
                  <tr key={`${index}-${gradeIndex}`}>
                    <td className="subcategory-name"><b>{grade.category}</b> {grade.title}</td>
                    <td className="indicator-cell">
                      <div
                        className={`indicator`}
                        onClick={() => handleNavigation(index + 1, 'basic', category, grade)}
                      >
                        {results[grade.id] == 'B' ? <div class="greydoor"><FaDoorOpen /></div> : <div class="greenok"><FaCheck /></div>}
                      </div>
                    </td>
                    <td className="indicator-cell">
                      <div
                          className={`indicator`}
                          onClick={
                            results[grade.id] === 'B'
                              ? null // No onClick if result is 'B'
                              : () => handleNavigation(index + 1, 'master', category, grade)
                          }
                        >
                          {results[grade.id] === 'F' && <div class="redlock"><FaLock /></div>} {/*red*/}
                          {results[grade.id] === 'B' && <div class="redlock"><FaLock /></div>}
                          {results[grade.id] === 'M' && <div class="greydoor"><FaDoorOpen /></div>}
                          {results[grade.id] === 'C' && <div class="greenok"><FaCheck /></div>} 
                      </div>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {isMatch && (
        <div className="match-image">
          <br />
          <h4>You Achieved</h4>
          <img src={`${process.env.PUBLIC_URL}/images/badge.png`} alt="Match Found" width={200} />
          <p className="signup-link">BADGE</p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
