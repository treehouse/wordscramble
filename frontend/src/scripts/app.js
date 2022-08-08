const startGame = document.getElementById('startNewGame')
const gameBoard = document.getElementById('gameboard');
const overlay = document.getElementById('overlay');
const howToPlayBtn = document.getElementById('howToPlay');
const modalContainer = document.getElementById('modalContainer');
const closeModalBtn = document.getElementById('closeModal');

startGame.addEventListener('click', () => {
    howToPlayBtn.setAttribute('disabled', true);
    let countdown = 5;

    startGame.textContent = `Starting in ${countdown}...`
    setInterval(() => {
        countdown --;
        startGame.textContent = `Starting in ${countdown}...`;
    }, 1000)
    setTimeout(() => {
        overlay.style.display = 'none';
        gameBoard.style.display = 'flex';
    }, 5000)
});

howToPlayBtn.addEventListener('click', () => {
    modalContainer.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('active');
})
