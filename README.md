#  TV Shows Hangman Game

A modern, interactive Hangman game featuring famous English TV shows from 2000 to present. Built with React for Microsoft Tech Club stall events and entertainment purposes.


##  Features

-  **50+ Modern TV Shows** - From Breaking Bad to Stranger Things (2000-present)
-  **Helper Letters** - 3-4 letters pre-filled to help you start
-  **Detailed Descriptions** - Rich clues about plot, characters, and setting
-  **Progressive Challenge** - Complete 3 shows to win the game
-  **Visual Lives System** - See your remaining 6 lives at a glance
-  **Microsoft Design** - Clean UI with MS Fluent Design principles
-  **Score Tracking** - Points system with persistent high scores
-  **Dual Input** - Click buttons or use your keyboard
-  **Responsive** - Works perfectly on desktop, tablet, and mobile
-  **Local Storage** - High scores saved in browser

##  Quick Start

### Prerequisites

```bash
Node.js 14+ and npm/yarn
```

### Installation

```bash
# Clone the repository
git clone https://github.com/TanaushAhmad/Hangman.git
cd Hangman

# Install dependencies
npm install

# Start development server
npm start
```

The game will open at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# The build folder is ready to deploy
```

##  How to Play

### Objective
**Guess 3 famous TV shows correctly to win the game!**

### Game Rules

1. **Read the Description** - Each show has a detailed 2-sentence description
2. **Use Pre-Filled Letters** - 3-4 letters are revealed in green boxes
3. **Guess Letters** - Click keyboard buttons or type on your keyboard
4. **Manage Lives** - You have 6 lives per show (wrong guess = -1 life)
5. **Complete Shows** - Reveal all letters to complete a show
6. **Win the Game** - Complete 3 shows total to win!

### Scoring System

```
 Per Show Win:
   • Base Points: 400
   • Letter Bonus: +15 per letter in title
   • Perfect Bonus: +200 (zero mistakes)
   • Mistake Penalty: -30 per wrong guess

 Final Score: Sum of all completed shows
```

**Example:**
```
Show: STRANGER THINGS (15 letters, 1 mistake)
400 + (15 × 15) - (1 × 30) = 595 points
```

##  TV Shows Database

The game features **50+ shows** across multiple genres:

### Categories

- **Drama** - Breaking Bad, Game of Thrones, The Crown, Succession
- **Comedy** - The Office, Fleabag, Parks and Recreation, Brooklyn Nine-Nine
- **Mystery/Crime** - Sherlock, Luther, True Detective, Killing Eve
- **Sci-Fi/Fantasy** - Stranger Things, Black Mirror, Doctor Who, The Mandalorian
- **Period Drama** - Downton Abbey, Bridgerton, Peaky Blinders
- **Reality** - The Great British Bake Off, Love Island
- **Teen** - Sex Education, Euphoria, Gossip Girl
- **Animation** - Rick and Morty, BoJack Horseman

All shows are from **2000 to present** only.

##  Technology Stack

- **Frontend Framework:** React 18+
- **Language:** JavaScript (ES6+)
- **Styling:** Inline CSS (CSS-in-JS)
- **Graphics:** HTML5 Canvas
- **State Management:** React Hooks (useState, useEffect, useRef)
- **Storage:** Browser localStorage API

**No external dependencies** - Pure React implementation!

##  Project Structure

```
Hangman/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── TVShowsHangman.jsx    # Main game component
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── README.md
└── LICENSE
```
