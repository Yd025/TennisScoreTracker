import React from 'react';

const GameConfigServing = ({ config, handleInputChange }) => {
  return (
    <>
      {config.gameType === 'singles' ? (
        <>
          <div className="form-group">
            <label htmlFor="player1">Player 1 Name:</label>
            <input
              type="text"
              id="player1"
              value={config.player1Name}
              onChange={(e) => handleInputChange('player1Name', e.target.value)}
              placeholder="Enter Player 1 name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="player2">Player 2 Name:</label>
            <input
              type="text"
              id="player2"
              value={config.player2Name}
              onChange={(e) => handleInputChange('player2Name', e.target.value)}
              placeholder="Enter Player 2 name"
            />
          </div>

          <div className="form-group">
            <label>Who serves first?</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="singlesServer1"
                  name="firstServer"
                  value="1"
                  checked={config.firstServer === '1'}
                  onChange={(e) => handleInputChange('firstServer', e.target.value)}
                />
                <label htmlFor="singlesServer1">{config.player1Name}</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="singlesServer2"
                  name="firstServer"
                  value="2"
                  checked={config.firstServer === '2'}
                  onChange={(e) => handleInputChange('firstServer', e.target.value)}
                />
                <label htmlFor="singlesServer2">{config.player2Name}</label>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="player1">Player 1 Name (Team 1):</label>
            <input
              type="text"
              id="player1"
              value={config.player1Name}
              onChange={(e) => handleInputChange('player1Name', e.target.value)}
              placeholder="Enter Player 1 name"
              style={{ border: '2px solid #ff6b6b' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="player2">Player 2 Name (Team 1):</label>
            <input
              type="text"
              id="player2"
              value={config.player2Name}
              onChange={(e) => handleInputChange('player2Name', e.target.value)}
              placeholder="Enter Player 2 name"
              style={{ border: '2px solid #ff6b6b' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team1Name">Team 1 Name:</label>
            <input
              type="text"
              id="team1Name"
              value={config.team1Name}
              onChange={(e) => handleInputChange('team1Name', e.target.value)}
              placeholder="Enter Team 1 name"
              style={{ border: '2px solid #ff6b6b' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="player3">Player 3 Name (Team 2):</label>
            <input
              type="text"
              id="player3"
              value={config.player3Name}
              onChange={(e) => handleInputChange('player3Name', e.target.value)}
              placeholder="Enter Player 3 name"
              style={{ border: '2px solid #4ecdc4' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="player4">Player 4 Name (Team 2):</label>
            <input
              type="text"
              id="player4"
              value={config.player4Name}
              onChange={(e) => handleInputChange('player4Name', e.target.value)}
              placeholder="Enter Player 4 name"
              style={{ border: '2px solid #4ecdc4' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team2Name">Team 2 Name:</label>
            <input
              type="text"
              id="team2Name"
              value={config.team2Name}
              onChange={(e) => handleInputChange('team2Name', e.target.value)}
              placeholder="Enter Team 2 name"
              style={{ border: '2px solid #4ecdc4' }}
            />
          </div>

          <div className="form-group">
            <label>Which team serves first?</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="doublesTeam1"
                  name="firstServer"
                  value="team1"
                  checked={config.firstServer === 'team1'}
                  onChange={(e) => handleInputChange('firstServer', e.target.value)}
                />
                <label htmlFor="doublesTeam1">{config.team1Name}</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="doublesTeam2"
                  name="firstServer"
                  value="team2"
                  checked={config.firstServer === 'team2'}
                  onChange={(e) => handleInputChange('firstServer', e.target.value)}
                />
                <label htmlFor="doublesTeam2">{config.team2Name}</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Who serves first in {config.team1Name}?</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="team1Server1"
                  name="team1FirstServer"
                  value="1"
                  checked={config.team1FirstServer === '1'}
                  onChange={(e) => handleInputChange('team1FirstServer', e.target.value)}
                />
                <label htmlFor="team1Server1">{config.player1Name}</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="team1Server2"
                  name="team1FirstServer"
                  value="2"
                  checked={config.team1FirstServer === '2'}
                  onChange={(e) => handleInputChange('team1FirstServer', e.target.value)}
                />
                <label htmlFor="team1Server2">{config.player2Name}</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Who serves first in {config.team2Name}?</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="team2Server3"
                  name="team2FirstServer"
                  value="3"
                  checked={config.team2FirstServer === '3'}
                  onChange={(e) => handleInputChange('team2FirstServer', e.target.value)}
                />
                <label htmlFor="team2Server3">{config.player3Name}</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="team2Server4"
                  name="team2FirstServer"
                  value="4"
                  checked={config.team2FirstServer === '4'}
                  onChange={(e) => handleInputChange('team2FirstServer', e.target.value)}
                />
                <label htmlFor="team2Server4">{config.player4Name}</label>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GameConfigServing;
