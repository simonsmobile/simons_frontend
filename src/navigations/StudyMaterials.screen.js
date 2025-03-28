import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import env from '../configs/env';
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";


const StudyMaterialsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { index, level, category, sub } = location.state || {};

  const handleReattempt = () => {
    navigate('/sub-quest', { state: { index, level, category, sub } });
  };

  const getMaterial = (material, level, type) => {
    // Filter material based on level and type
    const filteredMaterial = material.filter(
      (q) => q.level === level && q.type === type
    );

    // Return the material
    //console.log(filteredMaterial);
    return filteredMaterial;
  };

  const [learning_material, setMaterial] = useState(getMaterial(
    env.LEARNING_MATERIAL,
    level,
    sub.category
  ));
//  console.log(learning_material[0].text);

  const urls = learning_material[0].links;
  //console.log(urls);
  return (
    <div className="container">
      <p className="title">{category} </p>
      {sub&&<small>{sub.category} - {sub.title} ({level.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"})</small>}

      {/* Video Container */}
      <div style={{ width: '50%', maxWidth: '800px', margin: '0 auto' }}>
        <video
          controls
          style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          <source src={`${process.env.PUBLIC_URL}/videos/${sub.category}-${level}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="study-content">
        <p>{learning_material[0].text}</p>
        {urls.length > 0 ? <p><strong>Additional resources</strong></p> : <div></div> }
       
        
        {urls.map(url => <div><a target="_blank" href={`${url.url}`}>{url.target}</a></div>)}

      </div>
      <br />
      <div class="button-container">

        <Link to={'/dashboard'}>
            <button type="button" className="goback-button">
            <p><FaChevronLeft /> Dashboard</p>
          </button>
        </Link>
        <button onClick={handleReattempt} className="takequiz-button">
        <MdOutlineQuiz /> Take the Quiz
        </button>
      </div>
      <div class="spacer"><p>&nbsp;</p></div>
    </div>
  );
};

export default StudyMaterialsScreen;
