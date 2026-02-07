import React, { useState, useEffect, useRef } from 'react';

// TV Shows Database - 2000 to Present Only
const tvShows = [
  { title: "GAME OF THRONES", category: "Epic Fantasy Drama", description: "Medieval fantasy series with dragons and kingdoms fighting for the Iron Throne. Features houses like Stark, Lannister, and Targaryen in Westeros.", year: "2011-2019", network: "HBO" },
  { title: "BREAKING BAD", category: "Crime Drama", description: "High school chemistry teacher starts cooking methamphetamine in Albuquerque. Anti-hero transforms from teacher to drug kingpin.", year: "2008-2013", network: "AMC" },
  { title: "THE CROWN", category: "Historical Drama", description: "Queen Elizabeth II's reign and British Royal Family drama spanning decades. Shows relationships with Prime Ministers and monarchy challenges.", year: "2016-2023", network: "Netflix" },
  { title: "DOWNTON ABBEY", category: "Period Drama", description: "Early 20th century British aristocratic family in grand estate. Covers WWI era and upstairs-downstairs relationships.", year: "2010-2015", network: "ITV" },
  { title: "PEAKY BLINDERS", category: "Crime Period Drama", description: "Post-WWI Birmingham gang family with Tommy Shelby as leader. Criminal empire building in 1920s England.", year: "2013-2022", network: "BBC" },
  { title: "STRANGER THINGS", category: "Sci-Fi Horror Drama", description: "1980s small-town kids discover parallel dimension called Upside Down. Features Eleven with telekinetic powers in Hawkins, Indiana.", year: "2016-present", network: "Netflix" },
  { title: "THE WIRE", category: "Crime Drama", description: "Baltimore drug scene and law enforcement from multiple perspectives. Complex urban crime and institutional dysfunction.", year: "2002-2008", network: "HBO" },
  { title: "MAD MEN", category: "Period Drama", description: "1960s New York advertising agency and executives. Don Draper's life and changing American culture.", year: "2007-2015", network: "AMC" },
  { title: "THE SOPRANOS", category: "Crime Drama", description: "New Jersey mob boss balances family life with criminal organization. Tony Soprano seeing a therapist.", year: "1999-2007", network: "HBO" },
  { title: "SUCCESSION", category: "Drama", description: "Media empire family fighting for control of company. Roy family power struggles and corporate intrigue.", year: "2018-2023", network: "HBO" },
  { title: "THE OFFICE", category: "Mockumentary Comedy", description: "Documentary-style sitcom about paper company employees in Slough. Awkward boss David Brent and workplace cringe humor.", year: "2001-2003", network: "BBC" },
  { title: "FLEABAG", category: "Comedy Drama", description: "Fourth-wall breaking woman navigating London life. Guinea pig cafe and complicated family relationships.", year: "2016-2019", network: "BBC" },
  { title: "THE IT CROWD", category: "Sitcom Comedy", description: "Socially awkward IT workers in basement office. Roy, Moss, and non-technical manager Jen with tech support humor.", year: "2006-2013", network: "Channel 4" },
  { title: "ARRESTED DEVELOPMENT", category: "Sitcom Comedy", description: "Wealthy dysfunctional Bluth family losing everything. Michael trying to keep family together with running gags.", year: "2003-2019", network: "Fox/Netflix" },
  { title: "PARKS AND RECREATION", category: "Mockumentary Comedy", description: "Indiana parks department employees with optimistic Leslie Knope. Small-town government workplace comedy.", year: "2009-2015", network: "NBC" },
  { title: "BROOKLYN NINE NINE", category: "Police Comedy", description: "New York police precinct detectives with Jake Peralta. Comedy about cops solving crimes.", year: "2013-2021", network: "Fox/NBC" },
  { title: "CURB YOUR ENTHUSIASM", category: "Comedy", description: "Larry David's fictionalized life in Los Angeles. Improvised comedy about social awkwardness.", year: "2000-present", network: "HBO" },
  { title: "MODERN FAMILY", category: "Sitcom Comedy", description: "Three diverse family units in Los Angeles mockumentary style. Extended Pritchett family relationships.", year: "2009-2020", network: "ABC" }
  // (truncated list - full list preserved in original TVShowsHangman.jsx)
];

const Hangman = () => {
  const [currentShow, setCurrentShow] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showsCompleted, setShowsCompleted] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('tvHangmanBestScore') || '0'));
  const [gameActive, setGameActive] = useState(false);
  const [preFilledLetters, setPreFilledLetters] = useState([]);
  const [completedShows, setCompletedShows] = useState([]);
  const [usedShows, setUsedShows] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [modalContent, setModalContent] = useState({ title: '', body: '', action: null });

  const canvasRef = useRef(null);
  const maxWrongGuesses = 6;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => { showWelcomeModal(); }, []);
  useEffect(() => { if (canvasRef.current && gameActive) drawHangman(); }, [wrongGuesses, gameActive]);

  const getRandomLetterIndices = (title, count) => {
    const lettersOnly = [];
    for (let i = 0; i < title.length; i++) if (title[i] !== ' ') lettersOnly.push(i);
    const shuffled = [...lettersOnly].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, lettersOnly.length));
  };

  const startNewShow = () => {
    let availableShows = tvShows.filter(show => !usedShows.includes(show.title));
    if (availableShows.length === 0) { availableShows = tvShows; setUsedShows([]); }
    const newShow = availableShows[Math.floor(Math.random() * availableShows.length)];
    setCurrentShow(newShow);
    setUsedShows([...usedShows, newShow.title]);
    const numToFill = Math.floor(Math.random() * 2) + 3;
    const indices = getRandomLetterIndices(newShow.title, numToFill);
    setPreFilledLetters(indices);
    const initialGuesses = [];
    indices.forEach(index => { const letter = newShow.title[index]; if (!initialGuesses.includes(letter)) initialGuesses.push(letter); });
    setGuessedLetters(initialGuesses);
    setWrongGuesses(0);
    setGameActive(true);
  };

  const guessLetter = (letter) => {
    if (!gameActive || guessedLetters.includes(letter)) return;
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);
    if (currentShow.title.includes(letter)) {
      if (checkWin(newGuessed)) { setGameActive(false); setTimeout(() => winShow(newGuessed), 500); }
    } else {
      const newWrong = wrongGuesses + 1; setWrongGuesses(newWrong);
      if (newWrong >= maxWrongGuesses) { setGameActive(false); setTimeout(() => loseShow(), 500); }
    }
  };

  const checkWin = (guessed) => currentShow.title.split('').every(char => char === ' ' || guessed.includes(char));

  const winShow = (finalGuessed) => {
    const basePoints = 400;
    const letterBonus = (currentShow.title.replace(/\s/g, '').length) * 15;
    const mistakesPenalty = wrongGuesses * 30;
    const perfectBonus = wrongGuesses === 0 ? 200 : 0;
    const earnedPoints = basePoints + letterBonus + perfectBonus - mistakesPenalty;
    const newScore = score + earnedPoints;
    const newCompleted = showsCompleted + 1;
    setScore(newScore);
    setShowsCompleted(newCompleted);
    setCompletedShows([...completedShows, currentShow]);
    if (newScore > highScore) { setHighScore(newScore); localStorage.setItem('tvHangmanBestScore', newScore.toString()); }
    if (newCompleted >= 3) { setTimeout(() => winGame(newScore, newCompleted), 800); return; }
    setModalContent({ title: '🎉 Correct!', body: (<div><p>You guessed the show!</p><div style={{fontWeight:'bold'}}>{currentShow.title}</div></div>), action: () => { setShowModal(false); startNewShow(); } });
    setShowModal(true);
  };

  const loseShow = () => {
    setModalContent({ title: '😔 Out of Lives', body: (<div><p>The show was: <strong>{currentShow.title}</strong></p></div>), action: () => { setShowModal(false); resetGame(); } });
    setShowModal(true);
  };

  const winGame = (finalScore, completed) => {
    setModalContent({ title: '🏆 VICTORY!', body: (<div><p>Congratulations! You won the game!</p></div>), action: () => { setShowModal(false); resetGame(); } });
    setShowModal(true);
  };

  const resetGame = () => { setShowsCompleted(0); setScore(0); setUsedShows([]); setCompletedShows([]); startNewShow(); };

  const showWelcomeModal = () => {
    setModalContent({ title: '📺 Welcome to TV Shows Challenge!', body: (<div><p>Guess 3 famous TV shows from 2000-present to win!</p></div>), action: () => { setShowModal(false); resetGame(); } });
    setShowModal(true);
  };

  const drawHangman = () => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = '#000000'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    if (wrongGuesses >= 0) { ctx.beginPath(); ctx.moveTo(20, 330); ctx.lineTo(180, 330); ctx.stroke(); }
    if (wrongGuesses >= 1) { ctx.beginPath(); ctx.moveTo(50, 330); ctx.lineTo(50, 30); ctx.stroke(); }
    if (wrongGuesses >= 2) { ctx.beginPath(); ctx.moveTo(50, 30); ctx.lineTo(200, 30); ctx.stroke(); }
    if (wrongGuesses >= 3) { ctx.beginPath(); ctx.moveTo(200, 30); ctx.lineTo(200, 70); ctx.stroke(); }
    if (wrongGuesses >= 4) { ctx.beginPath(); ctx.arc(200, 90, 20, 0, Math.PI * 2); ctx.stroke(); }
    if (wrongGuesses >= 5) { ctx.beginPath(); ctx.moveTo(200, 110); ctx.lineTo(200, 200); ctx.stroke(); }
    if (wrongGuesses >= 6) {
      ctx.beginPath(); ctx.moveTo(200, 130); ctx.lineTo(160, 170); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(200, 130); ctx.lineTo(240, 170); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(170, 260); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(230, 260); ctx.stroke();
    }
  };

  const renderWord = () => {
    if (!currentShow) return null;
    return currentShow.title.split('').map((char, index) => {
      if (char === ' ') return (<div key={index} style={{ width: '15px', height: '60px' }} />);
      const isRevealed = guessedLetters.includes(char);
      const isPreFilled = preFilledLetters.includes(index);
      return (
        <div key={index} style={{ width: '45px', height: '60px', border: isRevealed ? (isPreFilled ? '3px solid #930000' : '3px solid #000000') : '3px solid #000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8em', fontWeight: 'bold', background: isRevealed ? (isPreFilled ? 'linear-gradient(135deg, #930000, #ff0707)' : 'linear-gradient(135deg, #000000, #00b3ff)') : 'white', color: isRevealed ? 'white' : '#000000', transition: 'all 0.3s' }}>
          {isRevealed ? char : ''}
        </div>
      );
    });
  };

  const styles = { container: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: 'linear-gradient(135deg, #000000 0%, #00b3ff 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }, main: { background: 'white', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', maxWidth: '1100px', width: '100%', padding: '30px' } };

  if (!currentShow && !showModal) return null;

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ color: '#000000', fontSize: '2em', margin: 0 }}>📺 TV Shows Challenge</h1>
          <p style={{ color: '#666', fontSize: '0.95em', marginTop: '5px' }}>Guess 3 shows to win!</p>
        </div>

        {currentShow && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '25px' }}>
            <div style={{ background: '#f9f9f9', borderRadius: '15px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <canvas ref={canvasRef} width="300" height="350" style={{ border: '3px solid #002fff', borderRadius: '10px', background: 'white' }} />
              <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
                {[...Array(maxWrongGuesses)].map((_, i) => (
                  <div key={i} style={{ width: '30px', height: '30px', background: i < wrongGuesses ? '#d13438' : '#930000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>{i < wrongGuesses ? '✗' : '♥'}</div>
                ))}
              </div>
            </div>

            <div style={{ background: '#f9f9f9', borderRadius: '15px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ background: 'linear-gradient(135deg, #000000, #00b3ff)', color: 'white', padding: '8px 15px', borderRadius: '20px', fontSize: '0.85em', fontWeight: 'bold' }}>{currentShow.category.toUpperCase()}</div>
                <div style={{ background: '#ffb900', color: 'white', padding: '8px 15px', borderRadius: '20px', fontSize: '0.85em', fontWeight: 'bold' }}>SHOW {showsCompleted + 1}/3</div>
              </div>

              <div style={{ background: '#fff9e6', border: '2px solid #ffb900', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '8px', fontWeight: '600' }}>📖 Description:</div>
                <div style={{ color: '#333', fontSize: '1em', lineHeight: '1.5' }}>{currentShow.description}</div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', margin: '20px 0' }}>{renderWord()}</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(45px, 1fr))', gap: '6px', marginBottom: '20px' }}>
                {letters.map(letter => {
                  const isGuessed = guessedLetters.includes(letter);
                  const isCorrect = isGuessed && currentShow.title.includes(letter);
                  const isWrong = isGuessed && !currentShow.title.includes(letter);
                  return (
                    <button key={letter} onClick={() => guessLetter(letter)} disabled={!gameActive || isGuessed} style={{ padding: '12px 8px', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', background: isGuessed ? '#e0e0e0' : (isCorrect ? 'linear-gradient(135deg, #930000, #ff0707)' : (isWrong ? 'linear-gradient(135deg, #d13438, #ff6b6b)' : 'linear-gradient(135deg, #002fff, #00b3ff)')), color: isGuessed ? '#999' : 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>{letter}</button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => { if (gameActive && window.confirm('Start a new game? Current progress will be lost.')) { resetGame(); } else if (!gameActive) { resetGame(); } }} style={{ padding: '12px 25px', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', background: '#002fff', color: 'white' }}>New Game</button>
                <button onClick={showWelcomeModal} style={{ padding: '12px 25px', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', background: '#f3f2f1', color: '#333' }}>How to Play</button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 style={{ color: '#000000', marginBottom: '20px', fontSize: '2em' }}>{modalContent.title}</h2>
              <div>{modalContent.body}</div>
              <button onClick={modalContent.action} style={{ padding: '12px 25px', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', background: '#000000', color: 'white', marginTop: '20px' }}>{modalContent.title.includes('Welcome') ? 'Start Game' : modalContent.title.includes('VICTORY') ? 'Play Again' : modalContent.title.includes('Out of Lives') ? 'New Game' : 'Continue'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hangman;
