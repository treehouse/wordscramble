// let root = document.documentElement;

// let time = 10;
// let timer = document.querySelector('.timer');
// const pulse = document.querySelector('.pulse');
// timer.textContent = time;

// const timerInterval = setInterval(() => {
//     timer.textContent = time;
//     time -=1;
//     if (time < 0) {
//         clearInterval(timerInterval);
//         timer.textContent = 'X';
//         pulse.style.animation = 'none';
//         pulse.classList.add('winner');
//     }
// }, 1000);

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

// start new game with random word
function start() {
    pulse.classList = 'pulse';
    timer.textContent = '';
    let randomWord = generateRandomWord(words); 
    let splitRandomWord = randomWord.split("");
    let randomizedWord = shuffleLetters(splitRandomWord);
    buildWordToGameboard(randomizedWord);
    startGame.style.display = 'none';
}

// gameOver function
function gameOver() {
    startGame.style.display = 'block';
    startGame.textContent = 'Game Over. Play Again?';
    startGame.classList = 'start-game lose';
    timer.innerHTML = gameDefaults.icons.lose;
    pulse.classList = 'pulse lose';
}


// starting a new game on startGame button click
const startGameBtn = document.getElementById('startGame');
startGameBtn.addEventListener('click', () => {
    start();
    setTimer(gameDefaults.timer);
});
