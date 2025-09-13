import React from 'react';

const TennisCourt = ({ 
  servingPlayer, 
  gameType = 'singles', 
  player1Name, 
  player2Name, 
  player3Name,
  player4Name,
  team1Name,
  team2Name,
  servingSide = 'right',
  isTiebreaker = false,
  tiebreakerScore = { player1: 0, player2: 0 },
  currentSet = 0,
  gamesPlayed = 0
}) => {
  const isPlayer1Serving = servingPlayer === 1;
  const isPlayer2Serving = servingPlayer === 2;
  const isPlayer3Serving = servingPlayer === 3;
  const isPlayer4Serving = servingPlayer === 4;

  // Calculate serving position based on side and court swapping
  const getServingPosition = (player, side) => {
    if (gameType === 'singles') {
      // Singles: Players swap courts after games 1, 3, 5, 7, 9... (odd games)
      // Determine which side each player is on based on games played
      let player1Side, player2Side;
      
      if (gamesPlayed === 0) {
        // Game 0: Player 1 left, Player 2 right
        player1Side = 'left';
        player2Side = 'right';
      } else if (gamesPlayed === 1) {
        // Game 1: After swap - Player 1 right, Player 2 left
        player1Side = 'right';
        player2Side = 'left';
      } else if (gamesPlayed === 2) {
        // Game 2: No swap - Player 1 right, Player 2 left (same as game 1)
        player1Side = 'right';
        player2Side = 'left';
      } else if (gamesPlayed === 3) {
        // Game 3: After swap - Player 1 left, Player 2 right
        player1Side = 'left';
        player2Side = 'right';
      } else if (gamesPlayed === 4) {
        // Game 4: No swap - Player 1 left, Player 2 right (same as game 3)
        player1Side = 'left';
        player2Side = 'right';
      } else if (gamesPlayed === 5) {
        // Game 5: After swap - Player 1 right, Player 2 left
        player1Side = 'right';
        player2Side = 'left';
      } else {
        // For games 6+: Use pattern based on gamesPlayed
        // Swap after odd games: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19...
        const shouldSwap = gamesPlayed % 2 === 1; // Odd games
        
        if (shouldSwap) {
          // After odd game - swap positions
          if (gamesPlayed === 7) {
            player1Side = 'left';
            player2Side = 'right';
          } else if (gamesPlayed === 9) {
            player1Side = 'right';
            player2Side = 'left';
          } else if (gamesPlayed === 11) {
            player1Side = 'left';
            player2Side = 'right';
          } else {
            // Continue pattern
            player1Side = gamesPlayed % 4 === 3 ? 'left' : 'right';
            player2Side = gamesPlayed % 4 === 3 ? 'right' : 'left';
          }
        } else {
          // After even game - no swap, keep same positions as previous game
          if (gamesPlayed === 6) {
            player1Side = 'right';
            player2Side = 'left';
          } else if (gamesPlayed === 8) {
            player1Side = 'left';
            player2Side = 'right';
          } else if (gamesPlayed === 10) {
            player1Side = 'right';
            player2Side = 'left';
          } else {
            // Continue pattern
            player1Side = gamesPlayed % 4 === 2 ? 'right' : 'left';
            player2Side = gamesPlayed % 4 === 2 ? 'left' : 'right';
          }
        }
      }
      
      if (player === 1) {
        // Player 1 serving
        if (player1Side === 'left') {
          return side === 'right' ? { x: 75, y: 155 } : { x: 75, y: 55 };
        } else {
          return side === 'right' ? { x: 225, y: 55 } : { x: 225, y: 155 };
        }
      } else {
        // Player 2 serving
        if (player2Side === 'left') {
          return side === 'right' ? { x: 75, y: 155 } : { x: 75, y: 55 };
        } else {
          return side === 'right' ? { x: 225, y: 55 } : { x: 225, y: 155 };
        }
      }
    } else {
      // Doubles: Same logic as singles but for teams
      let team1Side, team2Side;
      
      if (gamesPlayed === 0) {
        // Game 0: Team 1 left, Team 2 right
        team1Side = 'left';
        team2Side = 'right';
      } else if (gamesPlayed === 1) {
        // Game 1: After swap - Team 1 right, Team 2 left
        team1Side = 'right';
        team2Side = 'left';
      } else if (gamesPlayed === 2) {
        // Game 2: No swap - Team 1 right, Team 2 left (same as game 1)
        team1Side = 'right';
        team2Side = 'left';
      } else if (gamesPlayed === 3) {
        // Game 3: After swap - Team 1 left, Team 2 right
        team1Side = 'left';
        team2Side = 'right';
      } else if (gamesPlayed === 4) {
        // Game 4: No swap - Team 1 left, Team 2 right (same as game 3)
        team1Side = 'left';
        team2Side = 'right';
      } else if (gamesPlayed === 5) {
        // Game 5: After swap - Team 1 right, Team 2 left
        team1Side = 'right';
        team2Side = 'left';
      } else {
        // For games 6+: Use pattern based on gamesPlayed
        // Swap after odd games: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19...
        const shouldSwap = gamesPlayed % 2 === 1; // Odd games
        
        if (shouldSwap) {
          // After odd game - swap positions
          if (gamesPlayed === 7) {
            team1Side = 'left';
            team2Side = 'right';
          } else if (gamesPlayed === 9) {
            team1Side = 'right';
            team2Side = 'left';
          } else if (gamesPlayed === 11) {
            team1Side = 'left';
            team2Side = 'right';
          } else {
            // Continue pattern
            team1Side = gamesPlayed % 4 === 3 ? 'left' : 'right';
            team2Side = gamesPlayed % 4 === 3 ? 'right' : 'left';
          }
        } else {
          // After even game - no swap, keep same positions as previous game
          if (gamesPlayed === 6) {
            team1Side = 'right';
            team2Side = 'left';
          } else if (gamesPlayed === 8) {
            team1Side = 'left';
            team2Side = 'right';
          } else if (gamesPlayed === 10) {
            team1Side = 'right';
            team2Side = 'left';
          } else {
            // Continue pattern
            team1Side = gamesPlayed % 4 === 2 ? 'right' : 'left';
            team2Side = gamesPlayed % 4 === 2 ? 'left' : 'right';
          }
        }
      }
      
      // Determine which team the player is on
      const isTeam1 = (player === 1 || player === 2);
      
      if (isTeam1) {
        // Team 1 player serving
        if (team1Side === 'left') {
          return side === 'right' ? { x: 75, y: 155 } : { x: 75, y: 55 };
        } else {
          return side === 'right' ? { x: 225, y: 55 } : { x: 225, y: 155 };
        }
      } else {
        // Team 2 player serving
        if (team2Side === 'left') {
          return side === 'right' ? { x: 75, y: 155 } : { x: 75, y: 55 };
        } else {
          return side === 'right' ? { x: 225, y: 55 } : { x: 225, y: 155 };
        }
      }
    }
  };

  const servingPos = getServingPosition(servingPlayer, servingSide);

  return (
    <div className="tennis-court-container">
      <h4>Court View</h4>
      <div className="tennis-court">
        {/* Court outline - more rectangular */}
        <svg width="300" height="200" viewBox="0 0 300 200" className="court-svg">
          {/* Court background */}
          <rect x="0" y="0" width="300" height="200" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2"/>
          
          {/* Net */}
          <line x1="150" y1="0" x2="150" y2="200" stroke="#fff" strokeWidth="8"/>
          
          {/* Horizontal line */}
          <line x1="0" y1="100" x2="300" y2="100" stroke="#fff" strokeWidth="2"/>
          
          {/* Service boxes */}
          {/* Left side service box */}
          <rect x="0" y="0" width="150" height="100" fill="none" stroke="#fff" strokeWidth="2"/>
          
          {/* Right side service box */}
          <rect x="150" y="0" width="150" height="100" fill="none" stroke="#fff" strokeWidth="2"/>
          
          {/* Left side back court */}
          <rect x="0" y="100" width="150" height="100" fill="none" stroke="#fff" strokeWidth="2"/>
          
          {/* Right side back court */}
          <rect x="150" y="100" width="150" height="100" fill="none" stroke="#fff" strokeWidth="2"/>
          
          {/* Service position indicator - positioned correctly based on serving side */}
          {isPlayer1Serving && (
            <circle cx={servingPos.x} cy={servingPos.y} r="10" fill={gameType === 'doubles' ? "#ff6b6b" : "#ff4444"} stroke="#fff" strokeWidth="2"/>
          )}
          
          {isPlayer2Serving && (
            <circle cx={servingPos.x} cy={servingPos.y} r="10" fill={gameType === 'doubles' ? "#ff6b6b" : "#4444ff"} stroke="#fff" strokeWidth="2"/>
          )}
          
          {gameType === 'doubles' && isPlayer3Serving && (
            <circle cx={servingPos.x} cy={servingPos.y} r="10" fill="#4ecdc4" stroke="#fff" strokeWidth="2"/>
          )}
          
          {gameType === 'doubles' && isPlayer4Serving && (
            <circle cx={servingPos.x} cy={servingPos.y} r="10" fill="#4ecdc4" stroke="#fff" strokeWidth="2"/>
          )}
          
          {/* Player labels - adjust based on court swapping */}
          {(() => {
            if (gameType === 'doubles') {
              // Determine team positions based on games played
              let team1Side, team2Side;
              
              if (gamesPlayed === 0) {
                team1Side = 'left';
                team2Side = 'right';
              } else if (gamesPlayed === 1) {
                team1Side = 'right';
                team2Side = 'left';
              } else if (gamesPlayed === 2) {
                team1Side = 'right';
                team2Side = 'left';
              } else if (gamesPlayed === 3) {
                team1Side = 'left';
                team2Side = 'right';
              } else if (gamesPlayed === 4) {
                team1Side = 'left';
                team2Side = 'right';
              } else if (gamesPlayed === 5) {
                team1Side = 'right';
                team2Side = 'left';
              } else {
                // For games 6+: Use pattern based on gamesPlayed
                // Swap after odd games: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19...
                const shouldSwap = gamesPlayed % 2 === 1; // Odd games
                
                if (shouldSwap) {
                  // After odd game - swap positions
                  if (gamesPlayed === 7) {
                    team1Side = 'left';
                    team2Side = 'right';
                  } else if (gamesPlayed === 9) {
                    team1Side = 'right';
                    team2Side = 'left';
                  } else if (gamesPlayed === 11) {
                    team1Side = 'left';
                    team2Side = 'right';
                  } else {
                    // Continue pattern
                    team1Side = gamesPlayed % 4 === 3 ? 'left' : 'right';
                    team2Side = gamesPlayed % 4 === 3 ? 'right' : 'left';
                  }
                } else {
                  // After even game - no swap, keep same positions as previous game
                  if (gamesPlayed === 6) {
                    team1Side = 'right';
                    team2Side = 'left';
                  } else if (gamesPlayed === 8) {
                    team1Side = 'left';
                    team2Side = 'right';
                  } else if (gamesPlayed === 10) {
                    team1Side = 'right';
                    team2Side = 'left';
                  } else {
                    // Continue pattern
                    team1Side = gamesPlayed % 4 === 2 ? 'right' : 'left';
                    team2Side = gamesPlayed % 4 === 2 ? 'left' : 'right';
                  }
                }
              }
              
              return (
                <>
                  <text x={team1Side === 'left' ? "75" : "225"} y="15" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                    {team1Name}
                  </text>
                  <text x={team2Side === 'left' ? "75" : "225"} y="15" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                    {team2Name}
                  </text>
                </>
              );
            } else {
              // Singles - determine player positions based on games played
              let player1Side, player2Side;
              
              if (gamesPlayed === 0) {
                player1Side = 'left';
                player2Side = 'right';
              } else if (gamesPlayed === 1) {
                player1Side = 'right';
                player2Side = 'left';
              } else if (gamesPlayed === 2) {
                player1Side = 'right';
                player2Side = 'left';
              } else if (gamesPlayed === 3) {
                player1Side = 'left';
                player2Side = 'right';
              } else if (gamesPlayed === 4) {
                player1Side = 'left';
                player2Side = 'right';
              } else if (gamesPlayed === 5) {
                player1Side = 'right';
                player2Side = 'left';
              } else {
                // For games 6+: Use pattern based on gamesPlayed
                // Swap after odd games: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19...
                const shouldSwap = gamesPlayed % 2 === 1; // Odd games
                
                if (shouldSwap) {
                  // After odd game - swap positions
                  if (gamesPlayed === 7) {
                    player1Side = 'left';
                    player2Side = 'right';
                  } else if (gamesPlayed === 9) {
                    player1Side = 'right';
                    player2Side = 'left';
                  } else if (gamesPlayed === 11) {
                    player1Side = 'left';
                    player2Side = 'right';
                  } else {
                    // Continue pattern
                    player1Side = gamesPlayed % 4 === 3 ? 'left' : 'right';
                    player2Side = gamesPlayed % 4 === 3 ? 'right' : 'left';
                  }
                } else {
                  // After even game - no swap, keep same positions as previous game
                  if (gamesPlayed === 6) {
                    player1Side = 'right';
                    player2Side = 'left';
                  } else if (gamesPlayed === 8) {
                    player1Side = 'left';
                    player2Side = 'right';
                  } else if (gamesPlayed === 10) {
                    player1Side = 'right';
                    player2Side = 'left';
                  } else {
                    // Continue pattern
                    player1Side = gamesPlayed % 4 === 2 ? 'right' : 'left';
                    player2Side = gamesPlayed % 4 === 2 ? 'left' : 'right';
                  }
                }
              }
              
              return (
                <>
                  <text x={player1Side === 'left' ? "75" : "225"} y="20" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                    {player1Name}
                  </text>
                  <text x={player2Side === 'left' ? "75" : "225"} y="20" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                    {player2Name}
                  </text>
                </>
              );
            }
          })()}
          
          {/* Service side indicator */}
          <text x="75" y="220" textAnchor="middle" fill="#fff" fontSize="10">
            {servingSide === 'right' ? 'Deuce Court' : 'Ad Court'}
          </text>
          <text x="225" y="220" textAnchor="middle" fill="#fff" fontSize="10">
            {servingSide === 'right' ? 'Deuce Court' : 'Ad Court'}
          </text>
        </svg>
        
        {/* Serving indicator */}
        <div className="serving-indicator">
          {isPlayer1Serving && (
            <div className="serving-player">
              <span 
                className="serving-dot player1" 
                style={{ backgroundColor: gameType === 'doubles' ? "#ff6b6b" : "#ff4444" }}
              ></span>
              <span>
                {gameType === 'doubles' ? `${player1Name} (${team1Name})` : player1Name} is serving 
              </span>
            </div>
          )}
          {isPlayer2Serving && (
            <div className="serving-player">
              <span 
                className="serving-dot player2" 
                style={{ backgroundColor: gameType === 'doubles' ? "#ff6b6b" : "#4444ff" }}
              ></span>
              <span>
                {gameType === 'doubles' ? `${player2Name} (${team1Name})` : player2Name} is serving 
              </span>
            </div>
          )}
          {gameType === 'doubles' && isPlayer3Serving && (
            <div className="serving-player">
              <span 
                className="serving-dot player3" 
                style={{ backgroundColor: "#4ecdc4" }}
              ></span>
              <span>
                {player3Name} ({team2Name}) is serving 
              </span>
            </div>
          )}
          {gameType === 'doubles' && isPlayer4Serving && (
            <div className="serving-player">
              <span 
                className="serving-dot player4" 
                style={{ backgroundColor: "#4ecdc4" }}
              ></span>
              <span>
                {player4Name} ({team2Name}) is serving from {servingSide} side
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TennisCourt;
