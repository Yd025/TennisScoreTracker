import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameConfigForm from './GameConfigForm';
import GameConfigServing from './GameConfigServing';

const GameConfig = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    sets: '3',
    scoringSystem: 'advantage',
    gameType: 'singles',
    player1Name: 'Player 1',
    player2Name: 'Player 2',
    player3Name: 'Player 3',
    player4Name: 'Player 4',
    team1Name: 'Team 1',
    team2Name: 'Team 2',
    // New simplified serving configuration
    firstServer: '1', // For singles: '1' or '2', For doubles: 'team1' or 'team2'
    team1FirstServer: '1', // For doubles: '1' or '2' (Player 1 or 2 in Team 1)
    team2FirstServer: '3' // For doubles: '3' or '4' (Player 3 or 4 in Team 2)
  });

  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartGame = () => {
    // Store config in localStorage for the game page to use
    localStorage.setItem('tennisGameConfig', JSON.stringify(config));
    navigate('/game');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Game Configuration</h2>
        
        <GameConfigForm config={config} handleInputChange={handleInputChange} />
        <GameConfigServing config={config} handleInputChange={handleInputChange} />

        <div style={{ marginTop: '30px' }}>
          <button className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
          <button className="btn" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameConfig;