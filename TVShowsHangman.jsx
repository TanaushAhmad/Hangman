import React, { useState, useEffect, useRef } from 'react';

// TV Shows Database - 2000 to Present Only
const tvShows = [
  // Drama
  { 
    title: "GAME OF THRONES", 
    category: "Epic Fantasy Drama", 
    description: "Medieval fantasy series with dragons and kingdoms fighting for the Iron Throne. Features houses like Stark, Lannister, and Targaryen in Westeros.",
    year: "2011-2019", 
    network: "HBO" 
  },
  { 
    title: "BREAKING BAD", 
    category: "Crime Drama", 
    description: "High school chemistry teacher starts cooking methamphetamine in Albuquerque. Anti-hero transforms from teacher to drug kingpin.",
    year: "2008-2013", 
    network: "AMC" 
  },
  { 
    title: "THE CROWN", 
    category: "Historical Drama", 
    description: "Queen Elizabeth II's reign and British Royal Family drama spanning decades. Shows relationships with Prime Ministers and monarchy challenges.",
    year: "2016-2023", 
    network: "Netflix" 
  },
  { 
    title: "DOWNTON ABBEY", 
    category: "Period Drama", 
    description: "Early 20th century British aristocratic family in grand estate. Covers WWI era and upstairs-downstairs relationships.",
    year: "2010-2015", 
    network: "ITV" 
  },
  { 
    title: "PEAKY BLINDERS", 
    category: "Crime Period Drama", 
    description: "Post-WWI Birmingham gang family with Tommy Shelby as leader. Criminal empire building in 1920s England.",
    year: "2013-2022", 
    network: "BBC" 
  },
  { 
    title: "STRANGER THINGS", 
    category: "Sci-Fi Horror Drama", 
    description: "1980s small-town kids discover parallel dimension called Upside Down. Features Eleven with telekinetic powers in Hawkins, Indiana.",
    year: "2016-present", 
    network: "Netflix" 
  },
  { 
    title: "THE WIRE", 
    category: "Crime Drama", 
    description: "Baltimore drug scene and law enforcement from multiple perspectives. Complex urban crime and institutional dysfunction.",
    year: "2002-2008", 
    network: "HBO" 
  },
  { 
    title: "MAD MEN", 
    category: "Period Drama", 
    description: "1960s New York advertising agency and executives. Don Draper's life and changing American culture.",
    year: "2007-2015", 
    network: "AMC" 
  },
  { 
    title: "THE SOPRANOS", 
    category: "Crime Drama", 
    description: "New Jersey mob boss balances family life with criminal organization. Tony Soprano seeing a therapist.",
    year: "1999-2007", 
    network: "HBO" 
  },
  { 
    title: "SUCCESSION", 
    category: "Drama", 
    description: "Media empire family fighting for control of company. Roy family power struggles and corporate intrigue.",
    year: "2018-2023", 
    network: "HBO" 
  },
  
  // Comedy
  { 
    title: "THE OFFICE", 
    category: "Mockumentary Comedy", 
    description: "Documentary-style sitcom about paper company employees in Slough. Awkward boss David Brent and workplace cringe humor.",
    year: "2001-2003", 
    network: "BBC" 
  },
  { 
    title: "FLEABAG", 
    category: "Comedy Drama", 
    description: "Fourth-wall breaking woman navigating London life. Guinea pig cafe and complicated family relationships.",
    year: "2016-2019", 
    network: "BBC" 
  },
  { 
    title: "THE IT CROWD", 
    category: "Sitcom Comedy", 
    description: "Socially awkward IT workers in basement office. Roy, Moss, and non-technical manager Jen with tech support humor.",
    year: "2006-2013", 
    network: "Channel 4" 
  },
  { 
    title: "ARRESTED DEVELOPMENT", 
    category: "Sitcom Comedy", 
    description: "Wealthy dysfunctional Bluth family losing everything. Michael trying to keep family together with running gags.",
    year: "2003-2019", 
    network: "Fox/Netflix" 
  },
  { 
    title: "PARKS AND RECREATION", 
    category: "Mockumentary Comedy", 
    description: "Indiana parks department employees with optimistic Leslie Knope. Small-town government workplace comedy.",
    year: "2009-2015", 
    network: "NBC" 
  },
  { 
    title: "BROOKLYN NINE NINE", 
    category: "Police Comedy", 
    description: "New York police precinct detectives with Jake Peralta. Comedy about cops solving crimes.",
    year: "2013-2021", 
    network: "Fox/NBC" 
  },
  { 
    title: "CURB YOUR ENTHUSIASM", 
    category: "Comedy", 
    description: "Larry David's fictionalized life in Los Angeles. Improvised comedy about social awkwardness.",
    year: "2000-present", 
    network: "HBO" 
  },
  { 
    title: "MODERN FAMILY", 
    category: "Sitcom Comedy", 
    description: "Three diverse family units in Los Angeles mockumentary style. Extended Pritchett family relationships.",
    year: "2009-2020", 
    network: "ABC" 
  },
  
  // Mystery/Crime
  { 
    title: "SHERLOCK", 
    category: "Mystery Crime Drama", 
    description: "Modern-day Sherlock Holmes in 21st century London. Benedict Cumberbatch as detective at 221B Baker Street with texting.",
    year: "2010-2017", 
    network: "BBC" 
  },
  { 
    title: "LUTHER", 
    category: "Crime Thriller", 
    description: "Brilliant but troubled London detective John Luther. Dark psychological cases and obsessive justice.",
    year: "2010-2019", 
    network: "BBC" 
  },
  { 
    title: "BROADCHURCH", 
    category: "Crime Mystery Drama", 
    description: "Small coastal town murder investigation of young boy. Detective duo unraveling community secrets.",
    year: "2013-2017", 
    network: "ITV" 
  },
  { 
    title: "KILLING EVE", 
    category: "Spy Thriller", 
    description: "MI5 officer Eve tracking stylish assassin Villanelle. Cat-and-mouse game across Europe.",
    year: "2018-2022", 
    network: "BBC America" 
  },
  { 
    title: "LINE OF DUTY", 
    category: "Police Procedural", 
    description: "Anti-Corruption Unit AC-12 investigating bent police officers. Intense interrogations and organized crime.",
    year: "2012-2021", 
    network: "BBC" 
  },
  { 
    title: "TRUE DETECTIVE", 
    category: "Crime Anthology", 
    description: "Different crime investigations each season with detective partnerships. Louisiana murder mysteries and complex cases.",
    year: "2014-present", 
    network: "HBO" 
  },
  { 
    title: "MINDHUNTER", 
    category: "Crime Thriller", 
    description: "FBI agents interviewing serial killers to understand criminal psychology. 1970s behavioral science development.",
    year: "2017-2019", 
    network: "Netflix" 
  },
  
  // Sci-Fi/Fantasy
  { 
    title: "DOCTOR WHO", 
    category: "Sci-Fi Adventure", 
    description: "Time-traveling alien in TARDIS phone box with regeneration ability. Sonic screwdriver and companions through space.",
    year: "2005-present", 
    network: "BBC" 
  },
  { 
    title: "BLACK MIRROR", 
    category: "Sci-Fi Anthology", 
    description: "Dystopian technology anthology with standalone episodes. Dark future predictions and social media dangers.",
    year: "2011-present", 
    network: "Channel 4/Netflix" 
  },
  { 
    title: "WESTWORLD", 
    category: "Sci-Fi Drama", 
    description: "Theme park with android hosts gaining consciousness. Western setting with AI and human nature themes.",
    year: "2016-2022", 
    network: "HBO" 
  },
  { 
    title: "THE BOYS", 
    category: "Superhero Satire", 
    description: "Corrupt superheroes and vigilantes trying to stop them. Dark take on superhero genre.",
    year: "2019-present", 
    network: "Amazon Prime" 
  },
  { 
    title: "THE HANDMAIDS TALE", 
    category: "Dystopian Drama", 
    description: "Totalitarian society where women are enslaved for reproduction. Gilead regime and resistance.",
    year: "2017-present", 
    network: "Hulu" 
  },
  
  // Period Drama
  { 
    title: "BRIDGERTON", 
    category: "Period Romance Drama", 
    description: "Regency-era London high society romance and debutante balls. Lady Whistledown gossip columnist and marriage market.",
    year: "2020-present", 
    network: "Netflix" 
  },
  { 
    title: "POLDARK", 
    category: "Historical Drama", 
    description: "Revolutionary War veteran returns to Cornwall mining community. 18th century love triangle and copper mining.",
    year: "2015-2019", 
    network: "BBC" 
  },
  { 
    title: "CALL THE MIDWIFE", 
    category: "Period Medical Drama", 
    description: "1950s-60s East London midwives and nuns delivering babies. Post-war poverty and social change.",
    year: "2012-present", 
    network: "BBC" 
  },
  { 
    title: "THE TUDORS", 
    category: "Historical Drama", 
    description: "King Henry VIII's reign and six wives. Tudor England political intrigue and romances.",
    year: "2007-2010", 
    network: "Showtime" 
  },
  
  // Reality/Competition
  { 
    title: "THE GREAT BRITISH BAKE OFF", 
    category: "Baking Competition", 
    description: "Amateur bakers in tent with signature and showstopper challenges. Paul Hollywood handshake and soggy bottoms.",
    year: "2010-present", 
    network: "BBC/Channel 4" 
  },
  { 
    title: "LOVE ISLAND", 
    category: "Dating Reality", 
    description: "Singles coupling up in villa with recoupling ceremonies. Casa Amor twist and public voting.",
    year: "2015-present", 
    network: "ITV" 
  },
  { 
    title: "STRICTLY COME DANCING", 
    category: "Dance Competition", 
    description: "Celebrities paired with professional dancers for ballroom. Judges scores and public vote entertainment.",
    year: "2004-present", 
    network: "BBC" 
  },
  
  // Teen/Young Adult
  { 
    title: "SKINS", 
    category: "Teen Drama", 
    description: "Bristol teenagers dealing with drugs and mental health. Parties and dysfunctional families with generation changes.",
    year: "2007-2013", 
    network: "E4" 
  },
  { 
    title: "THE INBETWEENERS", 
    category: "Teen Comedy", 
    description: "Four awkward British teenage boys in sixth form. Embarrassing moments and terrible social decisions.",
    year: "2008-2010", 
    network: "E4" 
  },
  { 
    title: "SEX EDUCATION", 
    category: "Teen Comedy Drama", 
    description: "Teenager runs underground sex therapy clinic at school. Mother is therapist with diverse sexuality representation.",
    year: "2019-2023", 
    network: "Netflix" 
  },
  { 
    title: "EUPHORIA", 
    category: "Teen Drama", 
    description: "High school students navigating drugs and identity. Rue's addiction recovery and intense teenage experiences.",
    year: "2019-present", 
    network: "HBO" 
  },
  { 
    title: "GOSSIP GIRL", 
    category: "Teen Drama", 
    description: "Manhattan elite teenagers with anonymous blogger exposing secrets. Upper East Side prep school drama.",
    year: "2007-2012", 
    network: "The CW" 
  },
  
  // Animation/Sitcom
  { 
    title: "RICK AND MORTY", 
    category: "Animated Sci-Fi Comedy", 
    description: "Scientist and grandson on interdimensional adventures. Dark humor and sci-fi concepts.",
    year: "2013-present", 
    network: "Adult Swim" 
  },
  { 
    title: "BOJACK HORSEMAN", 
    category: "Animated Comedy Drama", 
    description: "Washed-up sitcom star horse in Hollywood. Depression and existential themes with animal characters.",
    year: "2014-2020", 
    network: "Netflix" 
  },
  
  // Prestige Drama
  { 
    title: "BETTER CALL SAUL", 
    category: "Crime Drama", 
    description: "Breaking Bad prequel about lawyer Jimmy McGill becoming Saul Goodman. Albuquerque legal and criminal world.",
    year: "2015-2022", 
    network: "AMC" 
  },
  { 
    title: "THE LEFTOVERS", 
    category: "Mystery Drama", 
    description: "World after 2% of population vanishes without explanation. Grief and human response to unexplained event.",
    year: "2014-2017", 
    network: "HBO" 
  },
  { 
    title: "CHERNOBYL", 
    category: "Historical Miniseries", 
    description: "1986 nuclear disaster in Soviet Union. Scientists and firefighters dealing with catastrophe.",
    year: "2019", 
    network: "HBO" 
  },
  { 
    title: "THE WALKING DEAD", 
    category: "Horror Drama", 
    description: "Zombie apocalypse survivors trying to stay alive. Rick Grimes leading group through post-apocalyptic world.",
    year: "2010-2022", 
    network: "AMC" 
  },
  { 
    title: "LOST", 
    category: "Mystery Drama", 
    description: "Plane crash survivors on mysterious island with supernatural elements. Flashbacks revealing character backstories.",
    year: "2004-2010", 
    network: "ABC" 
  },
  { 
    title: "HOUSE OF CARDS", 
    category: "Political Drama", 
    description: "Ruthless politician Frank Underwood climbing power ladder. Washington DC manipulation and schemes.",
    year: "2013-2018", 
    network: "Netflix" 
  },
  { 
    title: "THE MARVELOUS MRS MAISEL", 
    category: "Period Comedy Drama", 
    description: "1950s housewife becomes stand-up comedian in New York. Midge Maisel breaking into male-dominated comedy world.",
    year: "2017-2023", 
    network: "Amazon Prime" 
  },
  { 
    title: "THE WITCHER", 
    category: "Fantasy Drama", 
    description: "Monster hunter Geralt in fantasy world with magic. Based on books with multiple timelines.",
    year: "2019-present", 
    network: "Netflix" 
  },
  { 
    title: "OZARK", 
    category: "Crime Thriller", 
    description: "Financial advisor laundering money for cartel in Missouri. Byrde family in dangerous criminal world.",
    year: "2017-2022", 
    network: "Netflix" 
  },
  { 
    title: "THE MANDALORIAN", 
    category: "Sci-Fi Western", 
    description: "Star Wars bounty hunter protecting Child across galaxy. Lone gunslinger in space western.",
    year: "2019-present", 
    network: "Disney+" 
  }
];

const TVShowsHangman = () => {
  // Game State
  const [currentShow, setCurrentShow] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showsCompleted, setShowsCompleted] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('tvHangmanBestScore') || '0');
  });
  const [gameActive, setGameActive] = useState(false);
  const [preFilledLetters, setPreFilledLetters] = useState([]);
  const [completedShows, setCompletedShows] = useState([]);
  const [usedShows, setUsedShows] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [modalContent, setModalContent] = useState({ title: '', body: '', action: null });

  const canvasRef = useRef(null);
  const maxWrongGuesses = 6;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Initialize game
  useEffect(() => {
    showWelcomeModal();
  }, []);

  // Draw hangman
  useEffect(() => {
    if (canvasRef.current && gameActive) {
      drawHangman();
    }
  }, [wrongGuesses, gameActive]);

  const getRandomLetterIndices = (title, count) => {
    const lettersOnly = [];
    for (let i = 0; i < title.length; i++) {
      if (title[i] !== ' ') {
        lettersOnly.push(i);
      }
    }
    const shuffled = [...lettersOnly].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, lettersOnly.length));
  };

  const startNewShow = () => {
    let availableShows = tvShows.filter(show => !usedShows.includes(show.title));
    if (availableShows.length === 0) {
      availableShows = tvShows;
      setUsedShows([]);
    }

    const newShow = availableShows[Math.floor(Math.random() * availableShows.length)];
    setCurrentShow(newShow);
    setUsedShows([...usedShows, newShow.title]);

    const numToFill = Math.floor(Math.random() * 2) + 3;
    const indices = getRandomLetterIndices(newShow.title, numToFill);
    setPreFilledLetters(indices);

    const initialGuesses = [];
    indices.forEach(index => {
      const letter = newShow.title[index];
      if (!initialGuesses.includes(letter)) {
        initialGuesses.push(letter);
      }
    });

    setGuessedLetters(initialGuesses);
    setWrongGuesses(0);
    setGameActive(true);
  };

  const guessLetter = (letter) => {
    if (!gameActive || guessedLetters.includes(letter)) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    if (currentShow.title.includes(letter)) {
      // Check win
      if (checkWin(newGuessed)) {
        setGameActive(false);
        setTimeout(() => winShow(newGuessed), 500);
      }
    } else {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);

      // Check lose
      if (newWrong >= maxWrongGuesses) {
        setGameActive(false);
        setTimeout(() => loseShow(), 500);
      }
    }
  };

  const checkWin = (guessed) => {
    return currentShow.title.split('').every(char => 
      char === ' ' || guessed.includes(char)
    );
  };

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

    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('tvHangmanBestScore', newScore.toString());
    }

    if (newCompleted >= 3) {
      setTimeout(() => winGame(newScore, newCompleted), 800);
      return;
    }

    setModalContent({
      title: '🎉 Correct!',
      body: (
        <div>
          <div style={{ fontSize: '3em', marginBottom: '15px' }}>✨🎊✨</div>
          <p>You guessed the show!</p>
          <div style={{
            background: '#f9f9f9',
            padding: '15px',
            borderRadius: '10px',
            margin: '20px 0',
            fontSize: '1.3em',
            fontWeight: 'bold',
            color: '#002fff'
          }}>
            {currentShow.title}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            margin: '20px 0',
            textAlign: 'left'
          }}>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Category</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#667eea' }}>{currentShow.category}</div>
            </div>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Aired</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#002fff' }}>{currentShow.year}</div>
            </div>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Network</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#667eea' }}>{currentShow.network}</div>
            </div>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Points Earned</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#002fff' }}>+{earnedPoints}</div>
            </div>
          </div>
          <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#002fff' }}>
            Progress: {newCompleted}/3 shows completed! 🌟
          </p>
        </div>
      ),
      action: () => {
        setShowModal(false);
        startNewShow();
      }
    });
    setShowModal(true);
  };

  const loseShow = () => {
    setModalContent({
      title: '😔 Out of Lives',
      body: (
        <div>
          <div style={{ fontSize: '3em', marginBottom: '15px' }}>📺</div>
          <p>The show was:</p>
          <div style={{
            background: '#f9f9f9',
            padding: '15px',
            borderRadius: '10px',
            margin: '20px 0',
            fontSize: '1.3em',
            fontWeight: 'bold',
            color: '#667eea'
          }}>
            {currentShow.title}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            margin: '20px 0',
            textAlign: 'left'
          }}>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Category</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#667eea' }}>{currentShow.category}</div>
            </div>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Network</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#667eea' }}>{currentShow.network}</div>
            </div>
          </div>
          <p style={{ marginTop: '20px' }}>
            You completed {showsCompleted} show{showsCompleted !== 1 ? 's' : ''}.<br/>
            Better luck next time! 🍀
          </p>
        </div>
      ),
      action: () => {
        setShowModal(false);
        resetGame();
      }
    });
    setShowModal(true);
  };

  const winGame = (finalScore, completed) => {
    setModalContent({
      title: '🏆 VICTORY!',
      body: (
        <div>
          <div style={{ fontSize: '3em', marginBottom: '15px' }}>🎉🏆🎉</div>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#930000' }}>
            Congratulations! You won the game!
          </p>
          <p>You successfully guessed all 3 TV shows!</p>
          
          <div style={{
            background: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#002fff', marginBottom: '15px' }}>Your Shows:</h3>
            {completedShows.map((show, index) => (
              <div key={index} style={{
                padding: '10px',
                margin: '8px 0',
                background: 'white',
                borderRadius: '8px',
                borderLeft: '4px solid #7fba00'
              }}>
                <div style={{ fontWeight: 'bold', color: '#002fff', fontSize: '1.1em' }}>
                  {index + 1}. {show.title}
                </div>
                <div style={{ fontSize: '0.9em', color: '#666', marginTop: '3px' }}>
                  {show.category} • {show.network} • {show.year}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            margin: '20px 0'
          }}>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Final Score</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#002fff' }}>{finalScore}</div>
            </div>
            <div style={{ background: '#f5f7fa', padding: '12px', borderRadius: '8px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85em', color: '#666' }}>Previous Best</div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#002fff' }}>{highScore}</div>
            </div>
          </div>
          
          {finalScore > highScore && (
            <p style={{ color: '#7fba00', fontWeight: 'bold', fontSize: '1.2em', marginTop: '15px' }}>
              🎊 NEW HIGH SCORE! 🎊
            </p>
          )}
        </div>
      ),
      action: () => {
        setShowModal(false);
        resetGame();
      }
    });
    setShowModal(true);
  };

  const resetGame = () => {
    setShowsCompleted(0);
    setScore(0);
    setUsedShows([]);
    setCompletedShows([]);
    startNewShow();
  };

  const showWelcomeModal = () => {
    setModalContent({
      title: '📺 Welcome to TV Shows Challenge!',
      body: (
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <h3 style={{ color: '#002fff', marginBottom: '15px' }}>- Objective:</h3>
          <p style={{ color: '#333', lineHeight: '1.8', marginBottom: '20px' }}>
            <strong>Guess 3 famous TV shows from 2000-present to win!</strong>
          </p>
          
          <h3 style={{ color: '#002fff', marginBottom: '15px' }}>- Features:</h3>
          <ul style={{ lineHeight: '1.8', color: '#666' }}>
            <li>- 3-4 letters pre-filled to help you start</li>
            <li>- Detailed show descriptions</li>
            <li>- Win by completing 3 shows</li>
            <li>- 6 lives per show</li>
          </ul>
          
          <h3 style={{ color: '#002fff', margin: '20px 0 15px 0' }}>- Scoring:</h3>
          <ul style={{ lineHeight: '1.8', color: '#666' }}>
            <li>Base: 400 points per show</li>
            <li>Bonus: 15 points per letter</li>
            <li>Perfect: +200 (no mistakes)</li>
            <li>Penalty: -30 per wrong guess</li>
          </ul>
        </div>
      ),
      action: () => {
        setShowModal(false);
        resetGame();
      }
    });
    setShowModal(true);
  };

  const drawHangman = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Base
    if (wrongGuesses >= 0) {
      ctx.beginPath();
      ctx.moveTo(20, 330);
      ctx.lineTo(180, 330);
      ctx.stroke();
    }

    // Pole
    if (wrongGuesses >= 1) {
      ctx.beginPath();
      ctx.moveTo(50, 330);
      ctx.lineTo(50, 30);
      ctx.stroke();
    }

    // Top beam
    if (wrongGuesses >= 2) {
      ctx.beginPath();
      ctx.moveTo(50, 30);
      ctx.lineTo(200, 30);
      ctx.stroke();
    }

    // Rope
    if (wrongGuesses >= 3) {
      ctx.beginPath();
      ctx.moveTo(200, 30);
      ctx.lineTo(200, 70);
      ctx.stroke();
    }

    // Head
    if (wrongGuesses >= 4) {
      ctx.beginPath();
      ctx.arc(200, 90, 20, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Body
    if (wrongGuesses >= 5) {
      ctx.beginPath();
      ctx.moveTo(200, 110);
      ctx.lineTo(200, 200);
      ctx.stroke();
    }

    // Arms and legs
    if (wrongGuesses >= 6) {
      ctx.beginPath();
      ctx.moveTo(200, 130);
      ctx.lineTo(160, 170);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(200, 130);
      ctx.lineTo(240, 170);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(170, 260);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(230, 260);
      ctx.stroke();
    }
  };

  const renderWord = () => {
    if (!currentShow) return null;

    return currentShow.title.split('').map((char, index) => {
      if (char === ' ') {
        return (
          <div key={index} style={{
            width: '15px',
            height: '60px'
          }} />
        );
      }

      const isRevealed = guessedLetters.includes(char);
      const isPreFilled = preFilledLetters.includes(index);

      return (
        <div key={index} style={{
          width: '45px',
          height: '60px',
          border: isRevealed ? (isPreFilled ? '3px solid #930000' : '3px solid #002fff') : '3px solid #002fff',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8em',
          fontWeight: 'bold',
          background: isRevealed 
            ? (isPreFilled 
              ? 'linear-gradient(135deg, #930000, #ff0707)' 
              : 'linear-gradient(135deg, #002fff, #00b3ff)')
            : 'white',
          color: isRevealed ? 'white' : '#002fff',
          transition: 'all 0.3s'
        }}>
          {isRevealed ? char : ''}
        </div>
      );
    });
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #000000 0%, #ffffff 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    },
    main: {
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxWidth: '1100px',
      width: '100%',
      padding: '30px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '25px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '15px'
    },
    msLogo: {
      width: '50px',
      height: '50px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: '3px'
    },
    msSquare: {
      width: '100%',
      height: '100%'
    },
    progressSection: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '25px'
    },
    showsProgress: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '15px'
    },
    showSlot: {
      width: '100px',
      height: '100px',
      border: '3px dashed #002fff',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3em',
      background: 'white',
      transition: 'all 0.3s'
    },
    showSlotCompleted: {
      borderStyle: 'solid',
      background: 'linear-gradient(135deg, #930000, #ff0707)',
      color: 'white'
    },
    gameArea: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: '25px',
      marginBottom: '25px'
    },
    canvasContainer: {
      background: '#f9f9f9',
      borderRadius: '15px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    canvas: {
      border: '3px solid #002fff',
      borderRadius: '10px',
      background: 'white'
    },
    livesIndicator: {
      marginTop: '15px',
      display: 'flex',
      gap: '8px'
    },
    life: {
      width: '30px',
      height: '30px',
      background: '#930000',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s'
    },
    lifeLost: {
      background: '#d13438',
      transform: 'scale(0.8)'
    },
    wordDisplayArea: {
      background: '#f9f9f9',
      borderRadius: '15px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    },
    wordDisplay: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      justifyContent: 'center',
      margin: '20px 0',
      minHeight: '80px'
    },
    keyboard: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(45px, 1fr))',
      gap: '6px',
      marginBottom: '20px'
    },
    key: {
      padding: '12px 8px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1em',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s',
      background: 'linear-gradient(135deg, #002fff, #00b3ff)',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    keyDisabled: {
      background: '#e0e0e0',
      color: '#999',
      cursor: 'not-allowed'
    },
    keyCorrect: {
      background: 'linear-gradient(135deg, #930000, #ff0707)'
    },
    keyWrong: {
      background: 'linear-gradient(135deg, #d13438, #ff6b6b)'
    },
    button: {
      padding: '12px 25px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1em',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s',
      background: '#002fff',
      color: 'white'
    },
    modal: {
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.85)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      padding: '40px',
      borderRadius: '20px',
      textAlign: 'center',
      maxWidth: '550px',
      maxHeight: '90vh',
      overflowY: 'auto'
    }
  };

  if (!currentShow && !showModal) return null;

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.msLogo}>
              <div style={{...styles.msSquare, background: '#f25022'}} />
              <div style={{...styles.msSquare, background: '#930000'}} />
              <div style={{...styles.msSquare, background: '#00a4ef'}} />
              <div style={{...styles.msSquare, background: '#ffb900'}} />
            </div>
            <h1 style={{ color: '#002fff', fontSize: '2em', margin: 0 }}>📺 TV Shows Challenge</h1>
          </div>
          <p style={{ color: '#666', fontSize: '0.95em', marginTop: '5px' }}>
            Microsoft Tech Club - Guess 3 Shows to Win!
          </p>
        </div>

        {/* Progress Section */}
        <div style={styles.progressSection}>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#002fff', marginBottom: '5px' }}>
              Your Progress to Victory
            </div>
            <div style={{ color: '#666', fontSize: '0.9em' }}>
              Guess 3 shows correctly to win the game!
            </div>
          </div>
          <div style={styles.showsProgress}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                ...styles.showSlot,
                ...(i <= showsCompleted ? styles.showSlotCompleted : {})
              }}>
                {i <= showsCompleted ? '✓' : '📺'}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '3px' }}>Shows Completed</div>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#002fff' }}>{showsCompleted}/3</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '3px' }}>Current Score</div>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#002fff' }}>{score}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '3px' }}>Best Score</div>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#002fff' }}>{highScore}</div>
            </div>
          </div>
        </div>

        {currentShow && (
          <>
            {/* Game Area */}
            <div style={styles.gameArea}>
              {/* Canvas */}
              <div style={styles.canvasContainer}>
                <canvas ref={canvasRef} width="300" height="350" style={styles.canvas} />
                <div style={styles.livesIndicator}>
                  {[...Array(maxWrongGuesses)].map((_, i) => (
                    <div key={i} style={{
                      ...styles.life,
                      ...(i < wrongGuesses ? styles.lifeLost : {})
                    }}>
                      {i < wrongGuesses ? '✗' : '♥'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Word Display Area */}
              <div style={styles.wordDisplayArea}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #002fff, #00b3ff)',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '0.85em',
                    fontWeight: 'bold'
                  }}>
                    {currentShow.category.toUpperCase()}
                  </div>
                  <div style={{
                    background: '#ffb900',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '0.85em',
                    fontWeight: 'bold'
                  }}>
                    SHOW {showsCompleted + 1}/3
                  </div>
                </div>

                <div style={{
                  background: '#fff9e6',
                  border: '2px solid #ffb900',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '8px', fontWeight: '600' }}>
                    📖 Description:
                  </div>
                  <div style={{ color: '#333', fontSize: '1em', lineHeight: '1.5' }}>
                    {currentShow.description}
                  </div>
                </div>

                <div style={styles.wordDisplay}>
                  {renderWord()}
                </div>
              </div>
            </div>

            {/* Keyboard */}
            <div style={styles.keyboard}>
              {letters.map(letter => {
                const isGuessed = guessedLetters.includes(letter);
                const isCorrect = isGuessed && currentShow.title.includes(letter);
                const isWrong = isGuessed && !currentShow.title.includes(letter);

                return (
                  <button
                    key={letter}
                    onClick={() => guessLetter(letter)}
                    disabled={!gameActive || isGuessed}
                    style={{
                      ...styles.key,
                      ...(isGuessed ? styles.keyDisabled : {}),
                      ...(isCorrect ? styles.keyCorrect : {}),
                      ...(isWrong ? styles.keyWrong : {})
                    }}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (gameActive && window.confirm('Start a new game? Current progress will be lost.')) {
                    resetGame();
                  } else if (!gameActive) {
                    resetGame();
                  }
                }}
                style={styles.button}
              >
                New Game
              </button>
              <button
                onClick={showWelcomeModal}
                style={{...styles.button, background: '#f3f2f1', color: '#333'}}
              >
                How to Play
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={{ color: '#002fff', marginBottom: '20px', fontSize: '2em' }}>
              {modalContent.title}
            </h2>
            <div>{modalContent.body}</div>
            <button
              onClick={modalContent.action}
              style={{...styles.button, marginTop: '20px'}}
            >
              {modalContent.title.includes('Welcome') ? 'Start Game' : 
               modalContent.title.includes('VICTORY') ? 'Play Again' :
               modalContent.title.includes('Out of Lives') ? 'New Game' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVShowsHangman;