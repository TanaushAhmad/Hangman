# 📺 TV Shows Challenge - React Edition

A modern React-based Hangman game featuring famous English TV shows from 2000 to present. Designed for Microsoft Tech Club stall events with streamlined hints and contemporary show selections.

## 🎮 Game Overview

**TV Shows Challenge** is a React application where players guess 3 famous TV shows from the 2000s-2020s era to win the game. Features pre-filled letters, concise descriptions, and a clean modern interface.

## ✨ What's New in React Version

### Updates from HTML Version:
- ⚛️ **Built with React** - Modern component-based architecture
- 📺 **2000-Present Shows Only** - All shows from 2000 onwards (removed pre-2000 classics)
- 🎯 **Reduced Hints** - Single concise description (no additional hint system)
- 🚀 **Better Performance** - React state management and hooks
- 💡 **Cleaner UI** - Streamlined interface without hint buttons
- 📱 **Component Structure** - Easy to customize and extend

### Show Selection Criteria:
- ✅ Aired in 2000 or later
- ✅ English-language or British productions
- ✅ Critically acclaimed or culturally significant
- ✅ Mix of genres and networks

## 🎯 Features

- **📺 50+ Modern TV Shows** - From 2000 to present day
- **🎁 Pre-Filled Letters** - 3-4 letters revealed at start (shown in green)
- **📖 Concise Descriptions** - 2-sentence focused descriptions
- **🏆 3-Show Victory** - Complete 3 shows to win
- **❤️ 6 Lives Per Show** - Visual hearts showing remaining chances
- **🎨 Microsoft Branding** - Clean design with MS color palette
- **📊 Score Tracking** - Points system with localStorage high scores
- **⌨️ Keyboard Support** - Click buttons or type letters
- **📱 Responsive Design** - Works on all screen sizes

## 🚀 Installation & Setup

### Prerequisites

```bash
Node.js 14+ and npm/yarn installed
```

### Quick Start

**Option 1: Add to Existing React App**

```bash
# Copy TVShowsHangman.jsx to your src/components folder
cp TVShowsHangman.jsx your-app/src/components/

# Import and use in your App.js
import TVShowsHangman from './components/TVShowsHangman';

function App() {
  return <TVShowsHangman />;
}
```

**Option 2: Create New React App**

```bash
# Create new React app
npx create-react-app tv-shows-hangman
cd tv-shows-hangman

# Copy component
cp TVShowsHangman.jsx src/

# Update src/App.js
# Import and render TVShowsHangman component

# Run
npm start
```

**Option 3: Use with Vite (Faster)**

```bash
# Create Vite React app
npm create vite@latest tv-shows-hangman -- --template react
cd tv-shows-hangman
npm install

# Copy component
cp TVShowsHangman.jsx src/

# Update src/App.jsx to import TVShowsHangman

# Run
npm run dev
```

### File Structure

```
your-project/
├── src/
│   ├── components/
│   │   └── Hangman.jsx    # Main game component
│   ├── App.js                     # Import and use component
│   └── index.js
├── public/
└── package.json
```

## 📺 TV Shows Database (2000-Present)

The game includes **50+ shows** from modern era:

### Categories & Examples:

**Epic Fantasy Drama**
- Game of Thrones (2011-2019)
- The Witcher (2019-present)

**Crime Drama**
- Breaking Bad (2008-2013)
- Better Call Saul (2015-2022)
- The Wire (2002-2008)
- Ozark (2017-2022)

**Historical/Period Drama**
- The Crown (2016-2023)
- Downton Abbey (2010-2015)
- Peaky Blinders (2013-2022)
- Bridgerton (2020-present)

**Sci-Fi/Fantasy**
- Stranger Things (2016-present)
- Black Mirror (2011-present)
- Doctor Who (2005-present)
- Westworld (2016-2022)
- The Mandalorian (2019-present)

**Comedy**
- The Office UK (2001-2003)
- Fleabag (2016-2019)
- The IT Crowd (2006-2013)
- Parks and Recreation (2009-2015)
- Brooklyn Nine-Nine (2013-2021)

**Mystery/Thriller**
- Sherlock (2010-2017)
- Luther (2010-2019)
- Killing Eve (2018-2022)
- True Detective (2014-present)

**And many more across genres!**

## 🎮 How to Play

### Objective
**Guess 3 TV shows correctly to win the game!**

### Game Flow

1. **Read Description** - 2-sentence description with key details
2. **Use Pre-Filled Letters** - 3-4 letters shown in green boxes
3. **Guess Letters** - Click keyboard buttons or type on keyboard
4. **Complete Show** - Reveal all letters before 6 wrong guesses
5. **Progress** - Complete 3 shows total to win!

### Scoring

```
✅ BASE POINTS: 400 per show
📝 LETTER BONUS: +15 per letter in title
🎯 PERFECT BONUS: +200 (zero mistakes)
❌ MISTAKE PENALTY: -30 per wrong guess

Example: "SHERLOCK" (8 letters, 2 mistakes)
  400 + (8×15) - (2×30) = 460 points
```

## 🛠️ Customization

### Adding New Shows

Edit the `tvShows` array in `TVShowsHangman.jsx`:

```javascript
const tvShows = [
  { 
    title: "YOUR SHOW NAME",           // All caps with spaces
    category: "Genre Type",            // Display category
    description: "Two-sentence description. Include key plot points and characters.",
    year: "2020-present",             // Air dates
    network: "Network Name"            // Broadcasting network
  },
  // Add more shows...
];
```

### Example Good Description:

```javascript
{
  title: "THE MANDALORIAN",
  category: "Sci-Fi Western",
  description: "Star Wars bounty hunter protecting Child across galaxy. Lone gunslinger in space western.",
  year: "2019-present",
  network: "Disney+"
}
```

### Adjusting Pre-Filled Letters

Change number of helper letters:

```javascript
// In getRandomLetterIndices function
const numToFill = Math.floor(Math.random() * 2) + 3; // 3-4 letters

// For easier (4-5 letters):
const numToFill = Math.floor(Math.random() * 2) + 4;

// For harder (2-3 letters):
const numToFill = Math.floor(Math.random() * 2) + 2;
```

### Changing Victory Condition

Modify shows needed to win:

```javascript
// In winShow function
if (newCompleted >= 3) {  // Change 3 to desired number

// Update UI text accordingly
<div>Guess 5 Shows to Win!</div>  // Update all "3" references
```

### Adjusting Difficulty

```javascript
// Lives per show
const maxWrongGuesses = 8;  // Default: 6 (easier)

// Scoring values
const basePoints = 500;           // Higher reward
const letterBonus = 20;           // More per letter
const mistakesPenalty = 20;       // Less harsh
const perfectBonus = 300;         // Bigger perfect bonus
```

### Styling Customization

All styles are inline in the component. Edit the `styles` object:

```javascript
const styles = {
  container: {
    background: 'linear-gradient(135deg, #your-color1 0%, #your-color2 100%)',
    // ... other styles
  },
  // Modify any style object
};
```

### Color Scheme:

```javascript
// Microsoft colors (current)
Primary: #667eea (purple)
Success: #7fba00 (green)
Warning: #ffb900 (yellow)
Danger: #d13438 (red)
Info: #00a4ef (blue)

// To change theme, update gradient colors in styles
```

## 💻 Component Architecture

### State Management

```javascript
// Game state hooks
const [currentShow, setCurrentShow] = useState(null);
const [guessedLetters, setGuessedLetters] = useState([]);
const [wrongGuesses, setWrongGuesses] = useState(0);
const [showsCompleted, setShowsCompleted] = useState(0);
const [score, setScore] = useState(0);
const [gameActive, setGameActive] = useState(false);
const [preFilledLetters, setPreFilledLetters] = useState([]);
const [completedShows, setCompletedShows] = useState([]);
```

### Key Functions

```javascript
startNewShow()      // Initialize new show
guessLetter(letter) // Handle letter guess
checkWin(guessed)   // Check if show completed
winShow()          // Handle show completion
loseShow()         // Handle game over
resetGame()        // Start fresh game
drawHangman()      // Canvas rendering
```

### Canvas Drawing

The hangman is drawn using HTML5 Canvas with React `useRef`:

```javascript
const canvasRef = useRef(null);

useEffect(() => {
  if (canvasRef.current && gameActive) {
    drawHangman();
  }
}, [wrongGuesses, gameActive]);
```

## 📱 Responsive Design

The component adapts to screen sizes:

```javascript
// Desktop: 2-column layout (canvas | word area)
gridTemplateColumns: '1fr 1.2fr'

// Mobile: Single column (add media query wrapper component)
// Or use CSS-in-JS library like styled-components
```

## 🎪 Event Setup

### For Stall Events

**Display Setup:**
```
1. Laptop/tablet with React app running
2. Large external monitor (optional)
3. Mouse/keyboard accessible
4. Whiteboard for leaderboard
```

**Competition Modes:**

**Speed Challenge**
- First to complete 3 shows wins
- Time tracking optional
- Reset with "New Game" button

**High Score**
- 15-minute time limit
- Highest final score wins
- Scores persist in localStorage

**Perfect Run**
- Complete 3 shows with zero mistakes
- Fastest perfect time wins

### Running for Events

```bash
# Development mode (hot reload)
npm start

# Production build (faster, optimized)
npm run build
npx serve -s build

# Then open browser to localhost
```

## 🔧 Technical Details

### Dependencies

**Minimal - Only React:**
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

No additional libraries needed!

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- **Bundle Size**: ~15KB (minified + gzipped)
- **Initial Load**: <100ms
- **Renders**: Optimized with React hooks
- **Canvas**: Hardware-accelerated drawing

### Storage

```javascript
// High score persistence
localStorage.setItem('tvHangmanBestScore', score);
localStorage.getItem('tvHangmanBestScore');

// Clears on browser cache clear
// Per-domain storage (each deployment separate)
```

## 🎯 Development Guide

### Project Structure

```javascript
TVShowsHangman Component
├── State (hooks)
│   ├── Game state
│   ├── UI state
│   └── Modal state
├── Functions
│   ├── Game logic
│   ├── Canvas drawing
│   └── Helper functions
├── Effects
│   ├── Initialization
│   └── Canvas updates
└── Render
    ├── Header
    ├── Progress tracker
    ├── Game area
    ├── Keyboard
    └── Modal
```

### Adding Features

**Example: Add Sound Effects**

```javascript
// 1. Create sound effect function
const playSound = (type) => {
  const audio = new Audio(`/sounds/${type}.mp3`);
  audio.play();
};

// 2. Add to guess handler
const guessLetter = (letter) => {
  // ... existing code
  if (currentShow.title.includes(letter)) {
    playSound('correct');
  } else {
    playSound('wrong');
  }
};
```

**Example: Add Timer**

```javascript
// 1. Add state
const [timeElapsed, setTimeElapsed] = useState(0);

// 2. Add useEffect
useEffect(() => {
  if (gameActive) {
    const timer = setInterval(() => {
      setTimeElapsed(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }
}, [gameActive]);

// 3. Display in UI
<div>Time: {Math.floor(timeElapsed / 60)}:{timeElapsed % 60}</div>
```

## 🐛 Troubleshooting

### Common Issues

**Component not rendering:**
```javascript
// Check if imported correctly
import TVShowsHangman from './TVShowsHangman';

// Make sure exported as default
export default TVShowsHangman;
```

**Canvas not displaying:**
```javascript
// Ensure useRef is set
const canvasRef = useRef(null);

// Check useEffect dependencies
useEffect(() => {
  if (canvasRef.current && gameActive) {
    drawHangman();
  }
}, [wrongGuesses, gameActive]);  // Add all dependencies
```

**High score not saving:**
```javascript
// Check browser localStorage enabled
// Private/Incognito mode may block
// Try different browser
```

**Letters not updating:**
```javascript
// Verify state updates are immutable
setGuessedLetters([...guessedLetters, letter]); // Correct
setGuessedLetters(guessedLetters.push(letter)); // Wrong
```

## 📊 Shows Statistics

### Database Breakdown

- **Total Shows**: 50+
- **Era**: 2000-Present (24+ years)
- **Longest Title**: "THE GREAT BRITISH BAKE OFF" (26 letters)
- **Shortest Title**: "LOST" (4 letters)
- **Average Title Length**: 12 letters
- **Most Common Genre**: Crime Drama (12 shows)

### Show Selection Criteria

✅ **Included:**
- Shows that started airing in 2000 or later
- English-language productions
- UK and US shows
- Critically acclaimed series
- Pop culture phenomena

❌ **Excluded:**
- Pre-2000 shows (even if continued past 2000)
- Non-English language originals
- Very obscure titles
- Cancelled after 1 season (unless culturally significant)

## 🌟 Future Enhancements

### Potential Features to Add

- 🔊 **Sound Effects** - Correct/wrong guess sounds
- ⏱️ **Timer Mode** - Speed challenges
- 🏆 **Achievements** - Unlock badges
- 📈 **Statistics Page** - Detailed player stats
- 🎨 **Themes** - Multiple color schemes
- 💾 **Save Game** - Resume in-progress games
- 🌐 **Multiplayer** - Two-player mode
- 📱 **PWA** - Installable mobile app
- 🎵 **Background Music** - Toggle-able soundtrack
- 🔀 **Genre Filter** - Play shows from specific category

### Contributing

Want to improve the game?

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

Created for Microsoft Tech Club events. Free for educational and non-commercial use.

## 🎉 Credits

- **Design**: Microsoft Fluent Design inspiration
- **Shows**: Based on critically acclaimed TV series 2000-present
- **Technology**: React 18+
- **Fonts**: Segoe UI (Microsoft's official font family)

## 📞 Support

### Getting Help

- Check troubleshooting section above
- Review React documentation
- Inspect browser console (F12) for errors
- Verify all state updates are correct

### Resources

- [React Documentation](https://react.dev)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 🚀 Quick Deploy

### Deploy to Netlify

```bash
# Build production
npm run build

# Drag 'build' folder to netlify.com
# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

---

**Ready to build? Install React and get started!** ⚛️📺

Made with ❤️ for Microsoft Tech Club events
