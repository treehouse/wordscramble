const gameDefaults = {
    timer: 10,
    icons: {
        win: '<i class="fa-solid fa-star"></i>',
        lose: '<i class="fa-solid fa-xmark"></i>',
    }
}

const words = [
    'treehouse',
    'python',
    'javascript',
];

// generate random word from array
function generateRandomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// shuffle letters from randomly chosen word
function shuffleLetters(word) {
    let currentIndex = word.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [word[currentIndex], word[randomIndex]] = [
        word[randomIndex], word[currentIndex]];
    }
    return word;
}

// Build word to gameboard on gameStart
function buildWordToGameboard(word) {
    wordContainer.innerHTML = '';
    word.forEach(letter => {
        let li = document.createElement('li');
        li.textContent = letter;
        wordContainer.appendChild(li);
    });
}

// sets game timer with a timer (in seconds)
function setTimer(time) {
    document.getElementById('timerContainer').style.opacity = '1';
    let timer = time;
    let countDown = setInterval(() => {
        document.getElementById('timer').textContent = timer;
        timer -= 1;
        if (timer < 0) {
            clearInterval(countDown);
            gameOver();
        }
    }, 1000);
}

// building guessed word container
function buildGuessedWord(word) {
    guessedWordContainer.innerHTML = '';
    word.forEach(letter => {
        let li = document.createElement('li');
        guessedWordContainer.appendChild(li);
    })
}

// start new game with random word
function start() {
    let currentGuessIndex = 0;
    pulse.classList = 'pulse';
    timer.textContent = 'Go!';
    let randomWord = generateRandomWord(words); 
    let splitRandomWord = randomWord.split("");
    let randomizedWord = shuffleLetters(splitRandomWord);
    buildWordToGameboard(randomizedWord);
    startGame.style.display = 'none';
    buildGuessedWord(randomizedWord);
    keyboardInputListen(randomizedWord, currentGuessIndex);
}

function keyboardInputListen(word, index) {
    document.addEventListener('keydown', e => {
        let keyboardKeys = document.querySelectorAll('.keyboard li');
        let key = e.key.toLowerCase();
        let guessKeys = document.querySelectorAll('#guessedWordContainer li');
        const guessKeysLimit = guessKeys.length -1;
        

        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        if (alphabet.includes(key)) {
            keyboardKeys.forEach(letter => {    
                if (letter.textContent.toLowerCase() === key) {
                    letter.style.animation = 'keyboardClick .3s ease forwards';
                }
                letter.addEventListener('animationend', () => {
                    letter.style.animation = '';
                });
            });
            guessKeys[index].textContent = key.toLowerCase();
            if (index == guessKeysLimit) {
                guessKeys.forEach(letter => {
                    index = 0;
                    letter.textContent = '';
                    letter.style.animation = 'wobble .3s forwards';
                    letter.classList.add('wrong');
                    letter.addEventListener('animationend', () => {
                        letter.style.animation = '';
                        letter.classList.remove('wrong');
                    })
                });
            } else {
                index += 1;
            }
        }
    })
}

// gameOver function
function gameOver() {
    startGame.style.display = 'block';
    startGame.textContent = 'Game Over. Play Again?';
    startGame.classList = 'start-game lose';
    timer.innerHTML = gameDefaults.icons.lose;
    pulse.classList = 'pulse lose';
}

function checkWin() {

}

// starting a new game on startGame button click
const startGameBtn = document.getElementById('startGame');
startGameBtn.addEventListener('click', () => {
    start();
    setTimer(gameDefaults.timer);
});

