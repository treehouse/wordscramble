// words array
const words = [
    'python',
    'javascript'
];









// start new game
function startNewGame() {
    // choose random word and add to gameboard
    const scrambledWordContainer = document.getElementById('scrambledWordContainer');
    const scrambledWordGuessContainer = document.getElementById('scrambledWordGuessContainer');
    let randomWord = shuffle(words[Math.floor(Math.random() * words.length)].split(""));
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


















// starts a new game
const startGameBtn = document.getElementById('startNewGame')
const gameBoard = document.getElementById('gameboard');
const overlay = document.getElementById('overlay');
const gameTitle = document.getElementById('gameTitle');

startGameBtn.addEventListener('click', startGame);

function startGame() {
    // disable buttons on overlay
    howToPlayBtn.setAttribute('disabled', true);
    startGameBtn.setAttribute('disabled', true);

    // update title
    gameTitle.innerHTML = '<span class="accent">g</span>et<span class="accent">r</span>eady!';
    gameTitle.style.animation = 'bounceInUp 1s ease forwards';
    setTimeout(() => {
        gameTitle.style.animation = 'bounceOutDown 1s ease forwards';
    }, 4000);

    // start game countdown from 5
    let countdown = 5;
    startGameBtn.textContent = `Starting in ${countdown}...`
    setInterval(() => {
        countdown --;
        startGameBtn.textContent = `Starting in ${countdown}...`;
    }, 1000);
    
    // hide overlay and introduce gameboard
    setTimeout(() => {
        overlay.style.display = 'none';
        gameBoard.style.display = 'flex';
    }, 5000);

    // initiates a new game
    startNewGame();
}



document.addEventListener('keypress', e => {
})






// 'how to play' UI
const howToPlayBtn = document.getElementById('howToPlay');
const modalContainer = document.getElementById('modalContainer');
const closeModalBtn = document.getElementById('closeModal');

howToPlayBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
    modalContainer.classList.toggle('active');
}










