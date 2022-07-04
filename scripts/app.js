let root = document.documentElement;

let time = 10;
let timer = document.querySelector('.timer');
const pulse = document.querySelector('.pulse');
timer.textContent = time;

const timerInterval = setInterval(() => {
    timer.textContent = time;
    time -=1;
    if (time == 0) {
        clearInterval(timerInterval);
        timer.textContent = 'X';
        pulse.style.animation = 'none';
        pulse.classList.add('gameover');
    }
}, 1000);


