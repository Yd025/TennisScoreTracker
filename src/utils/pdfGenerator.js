import jsPDF from 'jspdf';

// Convert numeric game scores to traditional tennis scores
const convertToTennisScore = (playerScore, opponentScore, scoringSystem) => {
  const formatScore = (score) => {
    if (score === 0) return '0';
    if (score === 1) return '15';
    if (score === 2) return '30';
    if (score === 3) return '40';
    if (score >= 4) {
      if (scoringSystem === 'sudden') {
        return score.toString(); // Sudden death: just show the number
      } else {
        // Advantage scoring
        if (score === 4) return '40';
        if (score === 5) return 'A'; // Advantage
        return score.toString(); // Beyond advantage
      }
    }
    return score.toString();
  };

  // Handle deuce situations
  if (playerScore >= 3 && opponentScore >= 3) {
    if (scoringSystem === 'sudden') {
      return `${formatScore(playerScore)} - ${formatScore(opponentScore)}`;
    } else {
      // Advantage scoring
      if (playerScore === opponentScore) {
        return '40 - 40'; // Deuce
      } else if (playerScore > opponentScore) {
        if (playerScore === opponentScore + 1) {
          return 'A - 40'; // Advantage
        } else {
          return `${formatScore(playerScore)} - ${formatScore(opponentScore)}`;
        }
      } else {
        if (opponentScore === playerScore + 1) {
          return '40 - A'; // Opponent advantage
        } else {
          return `${formatScore(playerScore)} - ${formatScore(opponentScore)}`;
        }
      }
    }
  }

  return `${formatScore(playerScore)} - ${formatScore(opponentScore)}`;
};

export const generatePDF = (gameConfig, gameState) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('TENNIS MATCH SCORE SHEET', 105, 20, { align: 'center' });
  
  // Match details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Match Date: ${new Date().toLocaleDateString()}`, 20, 35);
  doc.text(`Match Time: ${new Date().toLocaleTimeString()}`, 20, 42);
  doc.text(`Game Type: ${gameConfig.gameType.toUpperCase()}`, 20, 49);
  doc.text(`Scoring System: ${gameConfig.scoringSystem === 'advantage' ? 'Advantage Deuce' : 'Sudden Death Deuce'}`, 20, 56);
  doc.text(`Sets: Best of ${gameConfig.sets}`, 20, 63);
  
  // Players
  doc.setFont('helvetica', 'bold');
  doc.text(`${gameConfig.player1Name}`, 20, 80);
  doc.text(`${gameConfig.player2Name}`, 120, 80);
  
  // Final score
  doc.setFontSize(14);
  doc.text('FINAL SCORE', 105, 95, { align: 'center' });
  
  // Sets table
  const tableTop = 105;
  const colWidth = 30;
  const rowHeight = 8;
  
  // Headers
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Set', 20, tableTop);
  doc.text(gameConfig.player1Name, 50, tableTop);
  doc.text(gameConfig.player2Name, 120, tableTop);
  doc.text('Winner', 150, tableTop);
  
  // Draw table lines
  doc.line(20, tableTop + 2, 180, tableTop + 2);
  
  // Set scores
  let currentY = tableTop + 10;
  gameState.sets.forEach((set, index) => {
    const setNumber = index + 1;
    const player1Score = set.player1;
    const player2Score = set.player2;
    const winner = player1Score > player2Score ? gameConfig.player1Name : 
                   player2Score > player1Score ? gameConfig.player2Name : '-';
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Set ${setNumber}`, 20, currentY);
    doc.text(player1Score.toString(), 50, currentY);
    doc.text(player2Score.toString(), 120, currentY);
    doc.text(winner, 150, currentY);
    
    currentY += rowHeight;
  });
  
  // Match winner
  const player1Sets = gameState.sets.filter(set => set.player1 > set.player2).length;
  const player2Sets = gameState.sets.filter(set => set.player2 > set.player1).length;
  const matchWinner = player1Sets > player2Sets ? gameConfig.player1Name : gameConfig.player2Name;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`MATCH WINNER: ${matchWinner}`, 105, currentY + 10, { align: 'center' });
  
  // Point history
  if (gameState.pointHistory && gameState.pointHistory.length > 0) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('POINT-BY-POINT HISTORY', 105, 20, { align: 'center' });
    
    // Point history table
    const historyTop = 35;
    let historyY = historyTop;
    
    // Headers
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Point #', 20, historyY);
    doc.text('Player', 40, historyY);
    doc.text('Game Score', 80, historyY);
    doc.text('Set Score', 120, historyY);
    doc.text('Set', 150, historyY);
    doc.text('Time', 170, historyY);
    
    doc.line(20, historyY + 2, 190, historyY + 2);
    historyY += 8;
    
    // Point records
    gameState.pointHistory.forEach((point, index) => {
      if (historyY > 280) {
        doc.addPage();
        historyY = 20;
      }
      
      // Convert game score to traditional tennis format
      let displayGameScore = point.gameScore;
      if (point.gameScoreNumeric && !point.gameScore.includes('Tiebreaker')) {
        displayGameScore = convertToTennisScore(
          point.gameScoreNumeric.player1, 
          point.gameScoreNumeric.player2, 
          gameConfig.scoringSystem
        );
      }
      
      doc.setFont('helvetica', 'normal');
      doc.text((index + 1).toString(), 20, historyY);
      doc.text(point.player, 40, historyY);
      doc.text(displayGameScore, 80, historyY);
      doc.text(point.setScore, 120, historyY);
      doc.text(point.set.toString(), 150, historyY);
      doc.text(new Date(point.timestamp).toLocaleTimeString(), 170, historyY);
      
      historyY += 6;
    });
  }
  
  // Save the PDF
  const fileName = `Tennis_Match_${gameConfig.player1Name}_vs_${gameConfig.player2Name}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
