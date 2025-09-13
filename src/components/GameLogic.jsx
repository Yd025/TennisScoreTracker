// Game logic functions for GamePage component
import { 
  checkGameWon, 
  checkSetWon, 
  checkMatchWon, 
  checkTiebreakerWon,
  getServingSide 
} from './GameUtils';

export const awardPoint = (player, gameState, saveState) => {
  const isPlayer1 = player === 1;
  
  // Handle tiebreaker scoring
  if (gameState.isTiebreaker) {
    const newTiebreakerScore = { ...gameState.tiebreakerScore };
    if (isPlayer1) {
      newTiebreakerScore.player1 += 1;
    } else {
      newTiebreakerScore.player2 += 1;
    }
    
    // Check if tiebreaker is won (first to 7 with 2-point lead)
    const tiebreakerWon = checkTiebreakerWon(newTiebreakerScore);
    
    if (tiebreakerWon) {
      // Check if this is a "Tie Break Only" match
      if (gameState.maxSets === 1) {
        // Tie Break Only: match is over, update sets to show winner
        const newSets = [...gameState.sets];
        if (newTiebreakerScore.player1 > newTiebreakerScore.player2) {
          newSets[0].player1 = 1; // Winner gets 1 set
          newSets[0].player2 = 0;
        } else {
          newSets[0].player1 = 0;
          newSets[0].player2 = 1; // Winner gets 1 set
        }
        
        // Match over
        saveState({
          ...gameState,
          player1GameScore: 0,
          player2GameScore: 0,
          sets: newSets,
          isTiebreaker: false,
          tiebreakerScore: { player1: 0, player2: 0 },
          servingSide: 'right',
          courtSwitched: false,
          pointHistory: [...gameState.pointHistory, {
            timestamp: new Date().toISOString(),
            player: isPlayer1 ? gameState.player1Name : gameState.player2Name,
            gameScore: `Tiebreaker: ${newTiebreakerScore.player1}-${newTiebreakerScore.player2}`,
            setScore: `${newSets[0].player1} - ${newSets[0].player2}`,
            set: 1
          }]
        });
        return;
      } else {
        // Regular tiebreaker: set is complete
        const newSets = [...gameState.sets];
        if (newTiebreakerScore.player1 > newTiebreakerScore.player2) {
          newSets[gameState.currentSet].player1 += 1;
        } else {
          newSets[gameState.currentSet].player2 += 1;
        }
        
        // Check if match is won
        const matchWon = checkMatchWon(newSets, gameState.maxSets);
        
        if (matchWon) {
          // Match over
          saveState({
            ...gameState,
            player1GameScore: 0,
            player2GameScore: 0,
            sets: newSets,
            isTiebreaker: false,
            tiebreakerScore: { player1: 0, player2: 0 },
            servingSide: 'right',
            courtSwitched: false,
            pointHistory: [...gameState.pointHistory, {
              timestamp: new Date().toISOString(),
              player: isPlayer1 ? gameState.player1Name : gameState.player2Name,
              gameScore: `Tiebreaker: ${newTiebreakerScore.player1}-${newTiebreakerScore.player2}`,
              setScore: `${newSets[gameState.currentSet].player1} - ${newSets[gameState.currentSet].player2}`,
              set: gameState.currentSet + 1
            }]
          });
          return;
        } else {
          // Move to next set
          saveState({
            ...gameState,
            player1GameScore: 0,
            player2GameScore: 0,
            sets: newSets,
            currentSet: gameState.currentSet + 1,
            servingPlayer: gameState.servingPlayer === 1 ? 2 : 1,
            isTiebreaker: false,
            tiebreakerScore: { player1: 0, player2: 0 },
            servingSide: 'right',
            courtSwitched: false,
            pointHistory: [...gameState.pointHistory, {
              timestamp: new Date().toISOString(),
              player: isPlayer1 ? gameState.player1Name : gameState.player2Name,
              gameScore: `Tiebreaker: ${newTiebreakerScore.player1}-${newTiebreakerScore.player2}`,
              setScore: `${newSets[gameState.currentSet].player1} - ${newSets[gameState.currentSet].player2}`,
              set: gameState.currentSet + 1
            }]
          });
          return;
        }
      }
    } else {
      // Tiebreaker continues, alternate serving every point
      const totalPoints = newTiebreakerScore.player1 + newTiebreakerScore.player2;
      const newServingPlayer = totalPoints % 2 === 0 ? gameState.servingPlayer : (gameState.servingPlayer === 1 ? 2 : 1);
      
      // Determine serving side: start from deuce court, alternate every point
      const servingSide = totalPoints % 2 === 0 ? 'right' : 'left';
      
      // Check if players need to switch courts (every 5 points: 5, 10, 15, etc.)
      const shouldSwitchCourts = totalPoints > 0 && totalPoints % 5 === 0;
      const newCourtSwitched = shouldSwitchCourts ? !gameState.courtSwitched : gameState.courtSwitched;
      
      saveState({
        ...gameState,
        tiebreakerScore: newTiebreakerScore,
        servingPlayer: newServingPlayer,
        servingSide: servingSide,
        courtSwitched: newCourtSwitched,
        pointHistory: [...gameState.pointHistory, {
          timestamp: new Date().toISOString(),
          player: isPlayer1 ? gameState.player1Name : gameState.player2Name,
          gameScore: `Tiebreaker: ${newTiebreakerScore.player1}-${newTiebreakerScore.player2}`,
          setScore: `${gameState.sets[gameState.currentSet].player1} - ${gameState.sets[gameState.currentSet].player2}`,
          set: gameState.currentSet + 1
        }]
      });
      return;
    }
  }
  
  // Regular game scoring
  const currentPlayerScore = isPlayer1 ? gameState.player1GameScore : gameState.player2GameScore;
  const opponentScore = isPlayer1 ? gameState.player2GameScore : gameState.player1GameScore;
  
  const newPlayerScore = currentPlayerScore + 1;
  
  // Add to point history
  const pointRecord = {
    timestamp: new Date().toISOString(),
    player: isPlayer1 ? gameState.player1Name : gameState.player2Name,
    gameScore: `${newPlayerScore} - ${opponentScore}`,
    gameScoreNumeric: { player1: isPlayer1 ? newPlayerScore : opponentScore, player2: isPlayer1 ? opponentScore : newPlayerScore },
    setScore: `${gameState.sets[gameState.currentSet].player1} - ${gameState.sets[gameState.currentSet].player2}`,
    set: gameState.currentSet + 1
  };

  // Check if game is won
  const gameWon = checkGameWon(newPlayerScore, opponentScore, gameState.scoringSystem);
  
  if (gameWon) {
    // Game won, update set score
    const newSets = [...gameState.sets];
    if (isPlayer1) {
      newSets[gameState.currentSet].player1 += 1;
    } else {
      newSets[gameState.currentSet].player2 += 1;
    }
    
    // Check if we need a tiebreaker (6-6)
    if (newSets[gameState.currentSet].player1 === 6 && newSets[gameState.currentSet].player2 === 6) {
      // Start tiebreaker
      saveState({
        ...gameState,
        player1GameScore: 0,
        player2GameScore: 0,
        sets: newSets,
        isTiebreaker: true,
        tiebreakerScore: { player1: 0, player2: 0 },
        servingSide: 'right',
        courtSwitched: false,
        pointHistory: [...gameState.pointHistory, pointRecord]
      });
      return;
    }
    
    // Check if set is won
    const setWon = checkSetWon(newSets[gameState.currentSet]);
    
    if (setWon) {
      // Set won, check if match is won
      const matchWon = checkMatchWon(newSets, gameState.maxSets);
      
      if (matchWon) {
        // Match over
        saveState({
          ...gameState,
          player1GameScore: 0,
          player2GameScore: 0,
          sets: newSets,
          pointHistory: [...gameState.pointHistory, pointRecord]
        });
        return;
      } else {
        // Move to next set
        if (gameState.gameType === 'singles') {
          // Singles: alternate between player 1 and 2
          saveState({
            ...gameState,
            player1GameScore: 0,
            player2GameScore: 0,
            sets: newSets,
            currentSet: gameState.currentSet + 1,
            servingPlayer: gameState.servingPlayer === 1 ? 2 : 1,
            servingSide: 'right', // Always start from right side
            gamesPlayed: gameState.gamesPlayed + 1,
            pointHistory: [...gameState.pointHistory, pointRecord]
          });
        } else {
          // Doubles: move to next player in serving order
          const nextServingIndex = (gameState.currentServingIndex + 1) % gameState.servingOrder.length;
          saveState({
            ...gameState,
            player1GameScore: 0,
            player2GameScore: 0,
            sets: newSets,
            currentSet: gameState.currentSet + 1,
            currentServingIndex: nextServingIndex,
            servingPlayer: gameState.servingOrder[nextServingIndex],
            servingSide: 'right', // Always start from right side
            gamesPlayed: gameState.gamesPlayed + 1,
            pointHistory: [...gameState.pointHistory, pointRecord]
          });
        }
        return;
      }
    }
    
    // Game won but set continues
    if (gameState.gameType === 'singles') {
      // Singles: alternate between player 1 and 2
      saveState({
        ...gameState,
        player1GameScore: 0,
        player2GameScore: 0,
        sets: newSets,
        servingPlayer: gameState.servingPlayer === 1 ? 2 : 1,
        servingSide: 'right', // Always start from right side
        gamesPlayed: gameState.gamesPlayed + 1,
        pointHistory: [...gameState.pointHistory, pointRecord]
      });
    } else {
      // Doubles: move to next player in serving order
      const nextServingIndex = (gameState.currentServingIndex + 1) % gameState.servingOrder.length;
      saveState({
        ...gameState,
        player1GameScore: 0,
        player2GameScore: 0,
        sets: newSets,
        currentServingIndex: nextServingIndex,
        servingPlayer: gameState.servingOrder[nextServingIndex],
        servingSide: 'right', // Always start from right side
        gamesPlayed: gameState.gamesPlayed + 1,
        pointHistory: [...gameState.pointHistory, pointRecord]
      });
    }
  } else {
    // Game continues - update serving side based on game score
    const newServingSide = getServingSide(newPlayerScore, opponentScore, gameState.servingPlayer);
    const newGameState = {
      ...gameState,
      player1GameScore: isPlayer1 ? newPlayerScore : gameState.player1GameScore,
      player2GameScore: isPlayer1 ? gameState.player2GameScore : newPlayerScore,
      servingSide: newServingSide,
      pointHistory: [...gameState.pointHistory, pointRecord]
    };
    saveState(newGameState);
  }
};
