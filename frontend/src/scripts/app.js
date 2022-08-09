// words array
const words = [
    'python',
    'javascript'
];







let wordToGuess;
let wordToGuessSplit;


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

    
    setTimeout(() => {
        progress.style.animation = 'timer 10s linear forwards';
    }, 500);


    wordToGuess = words[Math.floor(Math.random() * words.length)];
    wordToGuessSplit = wordToGuess.split("");
    let randomWord = shuffle(wordToGuessSplit);
    let randomWordLength = randomWord.length;

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

// temp test for failing game
document.getElementById('progress').addEventListener('animationend', () => {
    overlay.style.display = 'flex';
    gameBoard.style.display = 'none';
    gameStats.style.display = 'block';

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

    if (e.keyCode == 8) {
        guessIndex --;
        guess[guessIndex].textContent = '';
    }
    // for keypresses
    if (alphabet.includes(e.key)) {
        guess[guessIndex].textContent = e.key;
        guessIndex += 1;
    } else
    // for keyboard click
    if (alphabet.includes(e.target.textContent)) {
        guess[guessIndex].textContent = e.target.textContent;
        guessIndex += 1;
    }

    

    if (guessIndex == maxGuess) {

        guess.forEach((letter) => {
            let guessedLetter = letter.textContent;
            guessedWord.push(guessedLetter);
        });

        if (wordToGuess === guessedWord.toString().replace(/,/g,"")) {
            guessedWord = [];
            startNewGame();
        } else {
            guessedWord = [];
            guess.forEach((letter) => {
                letter.textContent = '';
            })
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







// starts a new game
const startGameBtn = document.getElementById('startNewGame')
const gameBoard = document.getElementById('gameboard');
const overlay = document.getElementById('overlay');
const gameTitle = document.getElementById('gameTitle');

startGameBtn.addEventListener('click', () => {
    showGameboard(5);
});

function showGameboard(countdown) {
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










