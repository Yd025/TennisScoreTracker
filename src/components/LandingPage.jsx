import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/config');
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Tennis Score Tracker</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#666' }}>
          Track your tennis matches with precision and generate professional score sheets
        </p>
        <button className="btn" onClick={handleStartGame}>
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
