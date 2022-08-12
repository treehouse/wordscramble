import { words } from '../scripts/words.js';

// game time limit (in seconds)
const timeLimit = 20;

const timeLimitSpan = document.getElementById('timeLimit');
timeLimitSpan.textContent = timeLimit;


let wordToGuess;
let wordToGuessSplit;
let currentStreak = 0;


// start new game
function startNewGame() {
    // choose random word and add to gameboard
    const scrambledWordContainer = document.getElementById('scrambledWordContainer');
    const scrambledWordGuessContainer = document.getElementById('scrambledWordGuessContainer');
    const progress = document.getElementById('progress');
    scrambledWordContainer.innerHTML = '';
    scrambledWordGuessContainer.innerHTML = '';
    guessIndex = 0;
    progress.style.animation = 'none';

    const headerText = document.querySelectorAll('.header-text');
    headerText.forEach((text) => {
        text.classList.remove('animate');
    })

    updateStreak(currentStreak);
    
    setTimeout(() => {
        progress.style.animation = `timer ${timeLimit}s linear forwards`;
    }, 500);


    wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
    wordToGuessSplit = wordToGuess.split("");
    let randomWord = shuffle(wordToGuessSplit);
    // let randomWordLength = randomWord.length;

    randomWord.forEach((letter) => {
        // adds shuffled word to gameboard
        let li = document.createElement('li');
        li.textContent = letter;
        scrambledWordContainer.appendChild(li);
        
        // adds empty guesses to gameboard
        let emptyLi = document.createElement('li');
        scrambledWordGuessContainer.appendChild(emptyLi);
    });

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
}

// logic for failing game
document.getElementById('progress').addEventListener('animationend', () => {

    overlay.style.display = 'flex';
    gameBoard.style.display = 'none';
    gameStats.style.display = 'block';

    // showing word to display:
    let gameStatsH2 = document.querySelector('.game-stats h2');
    let gameStatsH3 = document.querySelector('.game-stats h3');
    let wordSpan = document.querySelector('span.current-word');
    wordSpan.textContent = wordToGuess;
    setTimeout(() => {
        gameStatsH2.classList.add('animate');
        setTimeout(() => {
            gameStatsH3.classList.add('animate');
        }, 100 )
    }, 1200)

    // disable buttons on overlay
    howToPlayBtn.removeAttribute('disabled');
    startGameBtn.removeAttribute('disabled');

    gameTitle.innerHTML = '<span class="accent">w</span>ord<span class="accent">s</span>cramble';
    gameTitle.style.animation = 'bounceInDown 1s ease forwards';

    startGameBtn.textContent = 'Start New Game';

})











let guessIndex = 0;
let guessedWord = [];
function handleGuesses(e) {
    let guess = document.querySelectorAll('#scrambledWordGuessContainer li');
    let maxGuess = guess.length;
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // for backspaces
    if (e.keyCode == 8) {
        if (guessIndex != 0) {
            guessIndex --;
            guess[guessIndex].textContent = '';
            guess[guessIndex].classList.remove('pending');
        }
    }

    
    // for keypresses
    if (alphabet.includes(e.key)) {
        guess[guessIndex].textContent = e.key;
        guess[guessIndex].classList.add('pending');
        guessIndex += 1;
    } 
    // for keyboard click
    else if (alphabet.includes(e.target.textContent)) {
        guess[guessIndex].textContent = e.target.textContent;
        guess[guessIndex].classList.add('pending');
        guessIndex += 1;
    }

    // if all letters are guessed
    if (guessIndex == maxGuess) {

        guess.forEach((letter) => {
            let guessedLetter = letter.textContent;
            guessedWord.push(guessedLetter);
        });

        if (wordToGuess === guessedWord.toString().replace(/,/g,"")) {
            guessedWord = [];
            guessIndex = 0;
            handleCorrectLetterAnimations();
            progress.style.animation = 'none';
            progress.style.background = 'transparent';
            setTimeout(() => {
                currentStreak ++;
                startNewGame();
            }, 1200);
        } else {
            guessedWord = [];
            guess.forEach((letter) => {
                letter.textContent = '';
            });
            handleWrongLetterAnimations();
            guessIndex = 0;
        }
    }
}

document.addEventListener('keydown', e => {
    handleGuesses(e);
});

keyboard.addEventListener('click', e => {
    let letter = document.querySelectorAll('#keyboard li');
    letter.forEach((l) => {
        if (e.target === l) {
            handleGuesses(e);
        }
    })
});











function handleCorrectLetterAnimations() {
    let letters = scrambledWordGuessContainer.querySelectorAll('li');
    letters.forEach((letter) => {
        letter.classList = '';
    });
    letters.forEach((letter) => {
        letter.classList.add('correct');
    });
}

function handleWrongLetterAnimations() {
    let letters = scrambledWordGuessContainer.querySelectorAll('li');
    letters.forEach((letter) => {
        letter.classList = '';
    })
    letters.forEach((letter) => {
        letter.classList.add('wrong');

    });
    setTimeout(() => {
        letters.forEach((letter) => {
            letter.classList.remove('wrong');
        });
    }, 500);
}


















// starts a new game
const startGameBtn = document.getElementById('startNewGame')
const gameBoard = document.getElementById('gameboard');
const overlay = document.getElementById('overlay');
const gameTitle = document.getElementById('gameTitle');

startGameBtn.addEventListener('click', () => {
    showGameboard(5);
});

function showGameboard(countdown) {

    // sets currentStreak to 0
    currentStreak = 0;

    // hide gameStats if visible
    gameStats.style.display = 'none';

    // disable buttons on overlay
    howToPlayBtn.setAttribute('disabled', true);
    startGameBtn.setAttribute('disabled', true);

    // update title
    gameTitle.innerHTML = '<span class="accent">g</span>et<span class="accent">r</span>eady<span class="accent">!</span>';
    gameTitle.style.animation = 'bounceInUp 1s ease forwards';
    setTimeout(() => {
        gameTitle.style.animation = 'bounceOutDown 1s ease forwards';
    }, 4000);

    // start game countdown from 5
    startGameBtn.textContent = `Starting in ${countdown}...`
    let countdownToGame = setInterval(() => {
        countdown --;
        startGameBtn.textContent = `Starting in ${countdown}...`;
    }, 1000);
    
    // hide overlay and introduce gameboard
    setTimeout(() => {
        overlay.style.display = 'none';
        gameBoard.style.display = 'flex';
        clearInterval(countdownToGame);
    }, 5000);

    // initiates a new game
    startNewGame();
}









// //  T EM M P O R AR Y
// startNewGame();







// 'how to play' UI
const howToPlayBtn = document.getElementById('howToPlay');
const modalContainer = document.getElementById('modalContainer');
const closeModalBtn = document.getElementById('closeModal');

howToPlayBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
    modalContainer.classList.toggle('active');
}






// initializes streaks in localStorage
if (!localStorage.scrambleBestStreak) {
    localStorage.setItem('scrambleBestStreak', 0);
}

if (!localStorage.scrambleCurrentStreak) {
    localStorage.setItem('scrambleCurrentStreak', 0);
} else {
    let bestStreakText = document.querySelectorAll('.best-streak span');
    bestStreakText.forEach((text) => {
        text.textContent = localStorage.scrambleBestStreak;
    })
}

function updateStreak(streak) {
    let currentStreakText = document.querySelectorAll('.current-streak span');
    currentStreakText.forEach((text) => {
        text.textContent = streak;
    });

    if (currentStreak > localStorage.scrambleBestStreak) {
        localStorage.scrambleBestStreak = Number(currentStreak);
        let bestStreakText = document.querySelectorAll('.best-streak span');
        bestStreakText.forEach((text) => {
            text.textContent = localStorage.scrambleBestStreak;
        })
    }
}






const shareBtn = document.getElementById('share');
shareBtn.addEventListener('click', () => {
    // hidden textarea
    let textarea = document.querySelector('textarea');

    // get current date & format
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    let todaysBestStreak = localStorage.scrambleBestStreak;
    let todaysCurrentStreak = currentStreak;

    textarea.textContent = 
    `WordScramble on ${today}:
    - My all-time best streak: ${todaysBestStreak}
    - My last game's streak was: ${todaysCurrentStreak}

Think you could do better? Give it a try at
treehouse.github.io/wordscramble`

    textarea.select();
    document.execCommand("copy");

    shareBtn.textContent = 'Copied!'
    setTimeout(() => {
        shareBtn.textContent = 'Share';
        textarea.textContent = '';
    }, 3000)
});

