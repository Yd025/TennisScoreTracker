import React from 'react';

const ScoreBoard = ({ 
  player1Name, 
  player2Name, 
  player1Score, 
  player2Score, 
  currentSet, 
  sets, 
  gameType,
  isTiebreaker = false,
  tiebreakerScore = { player1: 0, player2: 0 },
  team1Name = 'Team 1',
  team2Name = 'Team 2'
}) => {
  const formatGameScore = (score) => {
    if (score === 0) return '0';
    if (score === 1) return '15';
    if (score === 2) return '30';
    if (score === 3) return '40';
    if (score === 4) return 'AD';
    return score.toString();
  };

  const formatSetScore = (setScore) => {
    if (setScore === null) return '-';
    return setScore.toString();
  };

  const isDeuce = player1Score >= 3 && player2Score >= 3 && player1Score === player2Score;
  const isAdvantage = (player1Score >= 4 || player2Score >= 4) && Math.abs(player1Score - player2Score) === 1;

  const getCurrentGameScore = () => {
    if (isTiebreaker) {
      return `Tiebreaker: ${tiebreakerScore.player1} - ${tiebreakerScore.player2}`;
    }
    
    if (isDeuce) {
      return 'Deuce';
    }
    if (isAdvantage) {
      if (player1Score > player2Score) {
        return `Advantage ${player1Name}`;
      } else {
        return `Advantage ${player2Name}`;
      }
    }
    return `${formatGameScore(player1Score)} - ${formatGameScore(player2Score)}`;
  };

  return (
    <div className="scoreboard">
      <div className="player-score">
        <div className="player-name">
          {gameType === 'doubles' ? team1Name : player1Name}
        </div>
        <div className="current-score">
          {isTiebreaker ? tiebreakerScore.player1 : formatGameScore(player1Score)}
        </div>
        <div className="sets-score">
          <div className="game-score">
            {sets.map((set, index) => (
              <span 
                key={index} 
                className={`set-score ${index === currentSet ? 'current-set' : ''}`}
              >
                {formatSetScore(set.player1)}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="vs">VS</div>
      
      <div className="player-score">
        <div className="player-name">
          {gameType === 'doubles' ? team2Name : player2Name}
        </div>
        <div className="current-score">
          {isTiebreaker ? tiebreakerScore.player2 : formatGameScore(player2Score)}
        </div>
        <div className="sets-score">
          <div className="game-score">
            {sets.map((set, index) => (
              <span 
                key={index} 
                className={`set-score ${index === currentSet ? 'current-set' : ''}`}
              >
                {formatSetScore(set.player2)}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ 
        gridColumn: '1 / -1', 
        textAlign: 'center', 
        marginTop: '10px',
        fontSize: '18px',
        fontWeight: '600',
        color: '#667eea'
      }}>
        {getCurrentGameScore()}
      </div>
      
      <div style={{ 
        gridColumn: '1 / -1', 
        textAlign: 'center', 
        marginTop: '5px',
        fontSize: '14px',
        color: '#666'
      }}>
        Set {currentSet + 1} of {sets.length} • {gameType === 'singles' ? 'Singles' : 'Doubles'}
      </div>
    </div>
  );
};

export default ScoreBoard;
