const words=["brian","dustin","rohald","jason","kari","kara","rachel","chris","stevee","amy","jesse","laura","ashlyn","travis","sarah","luke"],timeLimit=5,timeLimitSpan=document.getElementById("timeLimit");let wordToGuess,wordToGuessSplit;timeLimitSpan.textContent=5;let currentStreak=0;function startNewGame(){const e=document.getElementById("scrambledWordContainer"),t=document.getElementById("scrambledWordGuessContainer"),a=document.getElementById("progress");e.innerHTML="",t.innerHTML="",guessIndex=0,a.style.animation="none",updateStreak(currentStreak),setTimeout((()=>{a.style.animation="timer 5s linear forwards"}),500),wordToGuess=words[Math.floor(Math.random()*words.length)],wordToGuessSplit=wordToGuess.split(""),function(e){let t,a=e.length;for(;0!=a;)t=Math.floor(Math.random()*a),a--,[e[a],e[t]]=[e[t],e[a]];return e}(wordToGuessSplit).forEach((a=>{let n=document.createElement("li");n.textContent=a,e.appendChild(n);let s=document.createElement("li");t.appendChild(s)}))}document.getElementById("progress").addEventListener("animationend",(()=>{overlay.style.display="flex",gameBoard.style.display="none",gameStats.style.display="block",howToPlayBtn.removeAttribute("disabled"),startGameBtn.removeAttribute("disabled"),gameTitle.innerHTML='<span class="accent">w</span>ord<span class="accent">s</span>cramble',gameTitle.style.animation="bounceInDown 1s ease forwards",startGameBtn.textContent="Start New Game"}));let guessIndex=0,guessedWord=[];function handleGuesses(e){let t=document.querySelectorAll("#scrambledWordGuessContainer li"),a=t.length,n="abcdefghijklmnopqrstuvwxyz";8==e.keyCode&&0!=guessIndex&&(guessIndex--,t[guessIndex].textContent="",t[guessIndex].classList.remove("pending")),n.includes(e.key)?(t[guessIndex].textContent=e.key,t[guessIndex].classList.add("pending"),guessIndex+=1):n.includes(e.target.textContent)&&(t[guessIndex].textContent=e.target.textContent,t[guessIndex].classList.add("pending"),guessIndex+=1),guessIndex==a&&(t.forEach((e=>{let t=e.textContent;guessedWord.push(t)})),wordToGuess===guessedWord.toString().replace(/,/g,"")?(guessedWord=[],handleCorrectLetterAnimations(),progress.style.animation="none",progress.style.background="transparent",setTimeout((()=>{currentStreak++,startNewGame()}),1200)):(guessedWord=[],t.forEach((e=>{e.textContent=""})),handleWrongLetterAnimations(),guessIndex=0))}function handleCorrectLetterAnimations(){let e=scrambledWordGuessContainer.querySelectorAll("li");e.forEach((e=>{e.classList=""})),e.forEach((e=>{e.classList.add("correct")}))}function handleWrongLetterAnimations(){let e=scrambledWordGuessContainer.querySelectorAll("li");e.forEach((e=>{e.classList=""})),e.forEach((e=>{e.classList.add("wrong")})),setTimeout((()=>{e.forEach((e=>{e.classList.remove("wrong")}))}),500)}document.addEventListener("keydown",(e=>{handleGuesses(e)})),keyboard.addEventListener("click",(e=>{document.querySelectorAll("#keyboard li").forEach((t=>{e.target===t&&handleGuesses(e)}))}));const startGameBtn=document.getElementById("startNewGame"),gameBoard=document.getElementById("gameboard"),overlay=document.getElementById("overlay"),gameTitle=document.getElementById("gameTitle");function showGameboard(e){currentStreak=0,gameStats.style.display="none",howToPlayBtn.setAttribute("disabled",!0),startGameBtn.setAttribute("disabled",!0),gameTitle.innerHTML='<span class="accent">g</span>et<span class="accent">r</span>eady<span class="accent">!</span>',gameTitle.style.animation="bounceInUp 1s ease forwards",setTimeout((()=>{gameTitle.style.animation="bounceOutDown 1s ease forwards"}),4e3),startGameBtn.textContent=`Starting in ${e}...`;let t=setInterval((()=>{e--,startGameBtn.textContent=`Starting in ${e}...`}),1e3);setTimeout((()=>{overlay.style.display="none",gameBoard.style.display="flex",clearInterval(t)}),5e3),startNewGame()}startGameBtn.addEventListener("click",(()=>{showGameboard(5)}));const howToPlayBtn=document.getElementById("howToPlay"),modalContainer=document.getElementById("modalContainer"),closeModalBtn=document.getElementById("closeModal");function toggleModal(){modalContainer.classList.toggle("active")}if(howToPlayBtn.addEventListener("click",toggleModal),closeModalBtn.addEventListener("click",toggleModal),localStorage.scrambleBestStreak||localStorage.setItem("scrambleBestStreak",0),localStorage.scrambleCurrentStreak){document.querySelectorAll(".best-streak span").forEach((e=>{e.textContent=localStorage.scrambleBestStreak}))}else localStorage.setItem("scrambleCurrentStreak",0);function updateStreak(e){if(document.querySelectorAll(".current-streak span").forEach((t=>{t.textContent=e})),currentStreak>localStorage.scrambleBestStreak){localStorage.scrambleBestStreak=Number(currentStreak),document.querySelectorAll(".best-streak span").forEach((e=>{e.textContent=localStorage.scrambleBestStreak}))}}