// Utility functions for GamePage component

export const getServingSide = (player1Score, player2Score, servingPlayer) => {
  // In tennis, server alternates sides based on the total points in the game
  const totalPoints = player1Score + player2Score;
  
  // Server always starts on right side (deuce court), alternates every point
  // Even total points = right side (deuce court), odd total points = left side (ad court)
  return totalPoints % 2 === 0 ? 'right' : 'left';
};

export const getCurrentServingPlayer = (servingOrder, currentServingIndex) => {
  return servingOrder[currentServingIndex];
};

export const getNextServingPlayer = (servingOrder, currentServingIndex) => {
  const nextIndex = (currentServingIndex + 1) % servingOrder.length;
  return servingOrder[nextIndex];
};

export const getPlayerName = (playerNumber, gameState) => {
  switch(playerNumber) {
    case 1: return gameState.player1Name;
    case 2: return gameState.player2Name;
    case 3: return gameState.player3Name;
    case 4: return gameState.player4Name;
    default: return `Player ${playerNumber}`;
  }
};

export const getPlayerTeam = (playerNumber) => {
  if (playerNumber === 1 || playerNumber === 2) {
    return 1; // Team 1
  } else {
    return 2; // Team 2
  }
};

export const checkGameWon = (playerScore, opponentScore, scoringSystem) => {
  if (scoringSystem === 'sudden') {
    // Sudden death deuce
    return playerScore >= 4 && playerScore > opponentScore;
  } else {
    // Advantage deuce
    if (playerScore >= 4 && playerScore - opponentScore >= 2) {
      return true;
    }
    return false;
  }
};

export const checkSetWon = (setScore) => {
  const { player1, player2 } = setScore;
  return (player1 >= 6 && player1 - player2 >= 2) || (player2 >= 6 && player2 - player1 >= 2);
};

export const checkMatchWon = (sets, maxSets) => {
  // Count how many sets each player has actually won (not just games)
  let player1SetsWon = 0;
  let player2SetsWon = 0;
  
  sets.forEach(set => {
    // For tie break only matches, check if either player has 1 set
    if (maxSets === 1) {
      if (set.player1 === 1) {
        player1SetsWon++;
      } else if (set.player2 === 1) {
        player2SetsWon++;
      }
    } else {
      // Regular matches: check for 6+ games with 2-point lead
      if (set.player1 >= 6 && set.player1 - set.player2 >= 2) {
        player1SetsWon++;
      } else if (set.player2 >= 6 && set.player2 - set.player1 >= 2) {
        player2SetsWon++;
      }
    }
  });
  
  const requiredSets = Math.ceil(maxSets / 2);
  
  return player1SetsWon >= requiredSets || player2SetsWon >= requiredSets;
};

export const checkTiebreakerWon = (tiebreakerScore) => {
  const { player1, player2 } = tiebreakerScore;
  return (player1 >= 7 && player1 - player2 >= 2) || (player2 >= 7 && player2 - player1 >= 2);
};

export const initializeGameState = (parsedConfig) => {
  // Initialize game state
  const maxSets = parseInt(parsedConfig.sets);
  const initialSets = Array(maxSets).fill(null).map(() => ({ player1: 0, player2: 0 }));
  
  // Initialize serving configuration based on new system
  let initialServingPlayer, servingOrderArray;
  
  if (parsedConfig.gameType === 'singles') {
    // Singles: firstServer is '1' or '2'
    initialServingPlayer = parseInt(parsedConfig.firstServer || '1');
    servingOrderArray = [1, 2]; // Simple alternation for singles
  } else {
    // Doubles: firstServer is 'team1' or 'team2', then determine serving order
    const firstTeam = parsedConfig.firstServer || 'team1';
    const team1FirstServer = parseInt(parsedConfig.team1FirstServer || '1');
    const team2FirstServer = parseInt(parsedConfig.team2FirstServer || '3');
    
    if (firstTeam === 'team1') {
      initialServingPlayer = team1FirstServer;
      servingOrderArray = [team1FirstServer, team2FirstServer, 
                         team1FirstServer === 1 ? 2 : 1, 
                         team2FirstServer === 3 ? 4 : 3];
    } else {
      initialServingPlayer = team2FirstServer;
      servingOrderArray = [team2FirstServer, team1FirstServer, 
                         team2FirstServer === 3 ? 4 : 3, 
                         team1FirstServer === 1 ? 2 : 1];
    }
  }

  // Check if this is a "Tie Break Only" match
  const isTieBreakOnly = maxSets === 1;
  
  return {
    sets: initialSets,
    maxSets,
    gameType: parsedConfig.gameType,
    scoringSystem: parsedConfig.scoringSystem,
    player1Name: parsedConfig.player1Name,
    player2Name: parsedConfig.player2Name,
    player3Name: parsedConfig.player3Name || 'Player 3',
    player4Name: parsedConfig.player4Name || 'Player 4',
    team1Name: parsedConfig.team1Name || 'Team 1',
    team2Name: parsedConfig.team2Name || 'Team 2',
    servingOrder: servingOrderArray,
    currentServingIndex: 0,
    servingPlayer: initialServingPlayer,
    servingSide: 'right', // Always start from deuce court (right side of server)
    // If tie break only, start in tiebreaker mode
    isTiebreaker: isTieBreakOnly,
    tiebreakerScore: isTieBreakOnly ? { player1: 0, player2: 0 } : { player1: 0, player2: 0 },
    courtSwitched: false
  };
};
