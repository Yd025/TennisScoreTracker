import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TennisCourt from './TennisCourt';
import ScoreBoard from './ScoreBoard';
import { generatePDF } from '../utils/pdfGenerator';
import { initializeGameState, checkMatchWon } from './GameUtils';
import { awardPoint } from './GameLogic';

const GamePage = () => {
  const navigate = useNavigate();
  const [gameConfig, setGameConfig] = useState(null);
  const [gameState, setGameState] = useState({
    // Current game scores
    player1GameScore: 0,
    player2GameScore: 0,
    // Sets scores
    sets: [],
    currentSet: 0,
    // Serving
    servingPlayer: 1,
    // Game history for undo
    history: [],
    // Match details
    gameType: 'singles',
    scoringSystem: 'advantage',
    maxSets: 3,
    // Point history for PDF
    pointHistory: [],
    // Tiebreaker state
    isTiebreaker: false,
    tiebreakerScore: { player1: 0, player2: 0 },
    servingSide: 'right', // 'right' or 'left' - which side of court server is on
    courtSwitched: false, // Track if players have switched courts in tiebreaker
    // Player names
    player1Name: 'Player 1',
    player2Name: 'Player 2',
    player3Name: 'Player 3',
    player4Name: 'Player 4',
    // Team names
    team1Name: 'Team 1',
    team2Name: 'Team 2',
    // Serving order and current serving player
    servingOrder: [1, 3, 2, 4], // Array of player numbers in serving order
    currentServingIndex: 0, // Index in serving order array
    gamesPlayed: 0 // Track total games played for court swapping
  });

  useEffect(() => {
    const config = localStorage.getItem('tennisGameConfig');
    if (!config) {
      navigate('/');
      return;
    }

    const parsedConfig = JSON.parse(config);
    setGameConfig(parsedConfig);
    
    // Initialize game state using utility function
    const initialState = initializeGameState(parsedConfig);
    setGameState(prev => ({ ...prev, ...initialState }));
  }, [navigate]);

  const saveState = (newState) => {
    setGameState(prev => {
      const history = [...prev.history, {
        player1GameScore: prev.player1GameScore,
        player2GameScore: prev.player2GameScore,
        sets: [...prev.sets],
        currentSet: prev.currentSet,
        servingPlayer: prev.servingPlayer,
        isTiebreaker: prev.isTiebreaker,
        tiebreakerScore: { ...prev.tiebreakerScore },
        servingSide: prev.servingSide,
        courtSwitched: prev.courtSwitched
      }];
      
      return {
        ...newState,
        history: history.slice(-10) // Keep last 10 states for undo
      };
    });
  };

  const handleAwardPoint = (player) => {
    awardPoint(player, gameState, saveState);
  };

  const undoLastPoint = () => {
    if (gameState.history.length === 0) return;
    
    const lastState = gameState.history[gameState.history.length - 1];
    setGameState(prev => ({
      ...prev,
      player1GameScore: lastState.player1GameScore,
      player2GameScore: lastState.player2GameScore,
      sets: lastState.sets,
      currentSet: lastState.currentSet,
      servingPlayer: lastState.servingPlayer,
      isTiebreaker: lastState.isTiebreaker,
      tiebreakerScore: { ...lastState.tiebreakerScore },
      servingSide: lastState.servingSide,
      courtSwitched: lastState.courtSwitched,
      history: prev.history.slice(0, -1),
      pointHistory: prev.pointHistory.slice(0, -1)
    }));
  };

  const handleExportPDF = () => {
    generatePDF(gameConfig, gameState);
  };

  const handleNewGame = () => {
    navigate('/config');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!gameConfig) {
    return <div>Loading...</div>;
  }

  const isMatchOver = checkMatchWon(gameState.sets, gameState.maxSets);
  
  // Calculate winner based on actual set wins
  let player1SetsWon = 0;
  let player2SetsWon = 0;
  
  gameState.sets.forEach(set => {
    if (set.player1 >= 6 && set.player1 - set.player2 >= 2) {
      player1SetsWon++;
    } else if (set.player2 >= 6 && set.player2 - set.player1 >= 2) {
      player2SetsWon++;
    }
  });
  
  const winner = player1SetsWon > player2SetsWon ? 
    (gameState.gameType === 'doubles' ? gameState.team1Name : gameState.player1Name) : 
    (gameState.gameType === 'doubles' ? gameState.team2Name : gameState.player2Name);

  return (
    <div className="container">
      <div className="game-container">
        <div className="court-section">
          <TennisCourt 
            servingPlayer={gameState.servingPlayer} 
            gameType={gameState.gameType}
            player1Name={gameState.player1Name}
            player2Name={gameState.player2Name}
            player3Name={gameState.player3Name}
            player4Name={gameState.player4Name}
            team1Name={gameState.team1Name}
            team2Name={gameState.team2Name}
            servingSide={gameState.servingSide}
            isTiebreaker={gameState.isTiebreaker}
            tiebreakerScore={gameState.tiebreakerScore}
            currentSet={gameState.currentSet}
            gamesPlayed={gameState.gamesPlayed}
            courtSwitched={gameState.courtSwitched}
          />
        </div>

        <div className="score-section">
          <ScoreBoard
            player1Name={gameState.player1Name}
            player2Name={gameState.player2Name}
            player1Score={gameState.player1GameScore}
            player2Score={gameState.player2GameScore}
            currentSet={gameState.currentSet}
            sets={gameState.sets}
            gameType={gameState.gameType}
            isTiebreaker={gameState.isTiebreaker}
            tiebreakerScore={gameState.tiebreakerScore}
            team1Name={gameState.team1Name}
            team2Name={gameState.team2Name}
          />
        </div>

        {isMatchOver ? (
          <div className="controls-section">
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2>🎾 Game Over! 🎾</h2>
              <h3>Winner: {winner}</h3>
            </div>
            <button className="btn btn-success" onClick={handleExportPDF}>
              Export Score Sheet (PDF)
            </button>
            <button className="btn" onClick={handleNewGame}>
              New Game
            </button>
            <button className="btn btn-secondary" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        ) : (
          <div className="controls-section">
            <button 
              className="btn btn-success" 
              onClick={() => handleAwardPoint(1)}
              style={{ 
                backgroundColor: gameState.gameType === 'doubles' ? '#ff6b6b' : '#ff4444',
                border: 'none'
              }}
            >
              Point to {gameState.gameType === 'doubles' ? gameState.team1Name : gameState.player1Name}
            </button>
            <button 
              className="btn btn-success" 
              onClick={() => handleAwardPoint(2)}
              style={{ 
                backgroundColor: gameState.gameType === 'doubles' ? '#4ecdc4' : '#4444ff',
                border: 'none'
              }}
            >
              Point to {gameState.gameType === 'doubles' ? gameState.team2Name : gameState.player2Name}
            </button>
            <button 
              className="btn btn-danger" 
              onClick={undoLastPoint}
              disabled={gameState.history.length === 0}
            >
              Undo Last Point
            </button>
            <button className="btn btn-secondary" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;