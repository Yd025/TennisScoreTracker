# 🎾 Tennis Score Tracker

A comprehensive React web application for tracking tennis match scores with professional score sheet generation.

## ✨ Features

- **Game Configuration**: Choose between best of 3/5 sets, singles/doubles, advantage/sudden death deuce
- **Tie Break Only Mode**: Quick tie-break matches (first to 7 with 2-point lead)
- **Advanced Serving Setup**: Configure initial servers for singles and doubles matches
- **Visual Court Display**: Interactive tennis court with serving position indicators
- **Real-time Scoring**: Traditional tennis scoring (15, 30, 40, deuce, advantage)
- **Smart Tiebreakers**: Service alternates every point, court switching every 5 points
- **Point History**: Complete match tracking with timestamps
- **Undo Functionality**: Correct mistakes with comprehensive undo system
- **PDF Export**: Professional score sheets with traditional tennis scoring
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 How to Use

1. **Start Game**: Click "Start New Game" on the landing page
2. **Configure Match**: Choose your settings and enter player names
3. **Track Points**: Use the colored buttons to award points
4. **Monitor Progress**: Watch the real-time scoreboard and court diagram
5. **Export Results**: Generate a PDF score sheet when complete

## 🛠️ Installation

```bash
npm install
npm run dev
```

## 📁 Components

- **GameConfig.jsx** - Main configuration page with state management
- **GameConfigForm.jsx** - Basic game settings (sets, scoring, game type)
- **GameConfigServing.jsx** - Player names and serving configuration
- **GamePage.jsx** - Main game interface and layout
- **GameLogic.jsx** - Game scoring logic and tiebreaker rules
- **GameUtils.jsx** - Helper functions and win condition checks
- **TennisCourt.jsx** - Interactive court visualization
- **ScoreBoard.jsx** - Score display component
- **LandingPage.jsx** - Welcome page
- **pdfGenerator.js** - PDF export functionality

## 📄 PDF Export

The generated PDF includes:
- Match details and configuration
- Complete set-by-set scores
- Point-by-point history with traditional tennis scoring
- Match winner declaration
- Professional formatting

Perfect for tournament records, coaching analysis, or personal match tracking! 🏆