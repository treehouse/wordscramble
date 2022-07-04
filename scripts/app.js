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



/**
 * 1. Generate random word from array
 * 2. Shuffle letters from that word
 * 3. Return randomized word
 */

const words = [
    'treehouse',
    'python',
    'javascript',
];

let randomWord = generateRandomWord(words);
let splitRandomWord = randomWord.split("");

// 1. generate random word from array
function generateRandomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 2. shuffle letters from randomly chosen word
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

// 3. return randomized word
let randomizedWord = shuffleLetters(splitRandomWord);

// 4. Build word to gameboard on gameStart
const wordContainer = document.getElementById('wordContainer');
function buildWordToGameboard(word) {
    word.forEach(letter => {
        let li = document.createElement('li');
        li.textContent = letter;
        wordContainer.appendChild(li);
    });
}


/**
 * 
 * 1. initiate new game on startGame button click
 * 
 */

const startGame = document.getElementById("startGame");
startGame.addEventListener('click', () => {
    buildWordToGameboard(randomizedWord);
    startGame.style.display = 'none';
});
