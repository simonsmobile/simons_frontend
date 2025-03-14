import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StudyMaterialsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { index, level, category, sub } = location.state || {};

  const handleReattempt = () => {
    navigate('/sub-quest', { state: { index, level, category, sub } });
  };

  return (
    <div className="container">
      <span className="simple-heading">Learning Materials</span>
      <h4 className="title">{category} [{level.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"}]</h4>
      {sub&&<small>{sub.category} - {sub.title}</small>}

      {/* Video Container */}
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <video
          controls
          style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          <source src={`${process.env.PUBLIC_URL}/videos/sample.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="study-content">
        <p>Here is some dummy text for study content.</p>
        <p>This content is specific to the {category} competency at the {level} level.</p>
        <p>Review the material and click the button below to re-attempt the quiz.</p>
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
