import React from 'react';

const GameConfigForm = ({ config, handleInputChange }) => {
  return (
    <>
      <div className="form-group">
        <label>Number of Sets:</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="sets3"
              name="sets"
              value="3"
              checked={config.sets === '3'}
              onChange={(e) => handleInputChange('sets', e.target.value)}
            />
            <label htmlFor="sets3">Best of 3 Sets</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="sets5"
              name="sets"
              value="5"
              checked={config.sets === '5'}
              onChange={(e) => handleInputChange('sets', e.target.value)}
            />
            <label htmlFor="sets5">Best of 5 Sets</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="tiebreak"
              name="sets"
              value="1"
              checked={config.sets === '1'}
              onChange={(e) => handleInputChange('sets', e.target.value)}
            />
            <label htmlFor="tiebreak">Tie Break Only</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Scoring System:</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="advantage"
              name="scoring"
              value="advantage"
              checked={config.scoringSystem === 'advantage'}
              onChange={(e) => handleInputChange('scoringSystem', e.target.value)}
            />
            <label htmlFor="advantage">Advantage Deuce</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="sudden"
              name="scoring"
              value="sudden"
              checked={config.scoringSystem === 'sudden'}
              onChange={(e) => handleInputChange('scoringSystem', e.target.value)}
            />
            <label htmlFor="sudden">Sudden Death Deuce</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Game Type:</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="singles"
              name="gameType"
              value="singles"
              checked={config.gameType === 'singles'}
              onChange={(e) => handleInputChange('gameType', e.target.value)}
            />
            <label htmlFor="singles">Singles</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="doubles"
              name="gameType"
              value="doubles"
              checked={config.gameType === 'doubles'}
              onChange={(e) => handleInputChange('gameType', e.target.value)}
            />
            <label htmlFor="doubles">Doubles</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameConfigForm;
