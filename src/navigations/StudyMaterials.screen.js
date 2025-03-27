import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import env from '../configs/env';


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
    console.log(filteredMaterial);
    return filteredMaterial;
  };

  const [learning_material, setMaterial] = useState(getMaterial(
    env.LEARNING_MATERIAL,
    level,
    sub.category
  ));
//  console.log(learning_material[0].text);

  const urls = learning_material[0].links;
  console.log(urls);
  return (
    <div className="container">
      <span className="simple-heading">Learning Materials</span>
      <h4 className="title">{category} [{level.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"}]</h4>
      {sub&&<small>{sub.category} - {sub.title}</small>}

      {/* Video Container */}
      <div style={{ width: '60%', maxWidth: '800px', margin: '0 auto' }}>
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
        <p><strong>Additional resources</strong></p>
        
        {urls.map(url => <div><a target="_blank" href={`${url.url}`}>{url.target}</a></div>)}

      </div>
      <br />
      <button onClick={handleReattempt} className="reattempt-button">
        Re-attempt Quiz
      </button>

      <p className="signup-prompt">
        <Link to={'/dashboard'} className="signup-link">
          Go to Dashboard
        </Link>
      </p>
    </div>
  );
};

export default StudyMaterialsScreen;
