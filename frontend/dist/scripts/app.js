import{words}from"../scripts/words.js";const timeLimit=2e7,timeLimitSpan=document.getElementById("timeLimit");let wordToGuess,wordToGuessSplit;timeLimitSpan.textContent=2e7;let currentStreak=0;function startNewGame(){const e=document.getElementById("scrambledWordContainer"),t=document.getElementById("scrambledWordGuessContainer"),n=document.getElementById("progress");e.innerHTML="",t.innerHTML="",guessIndex=0,n.style.animation="none";document.querySelectorAll(".header-text").forEach((e=>{e.classList.remove("animate")})),updateStreak(currentStreak),setTimeout((()=>{n.style.animation="timer 20000000s linear forwards"}),500),wordToGuess=words[Math.floor(Math.random()*words.length)].toLowerCase(),wordToGuessSplit=wordToGuess.split(""),function(e){let t,n=e.length;for(;0!=n;)t=Math.floor(Math.random()*n),n--,[e[n],e[t]]=[e[t],e[n]];return e}(wordToGuessSplit).forEach((n=>{let a=document.createElement("li");a.textContent=n,e.appendChild(a);let s=document.createElement("li");t.appendChild(s)}))}const progress=document.getElementById("progress");progress.addEventListener("animationend",(()=>{overlay.style.display="flex",gameBoard.style.display="none",gameStats.style.display="block";let e=document.querySelector(".game-stats h2"),t=document.querySelector(".game-stats h3");document.querySelector("span.current-word").textContent=wordToGuess,setTimeout((()=>{e.classList.add("animate"),setTimeout((()=>{t.classList.add("animate")}),100)}),1200),howToPlayBtn.removeAttribute("disabled"),startGameBtn.removeAttribute("disabled"),gameTitle.innerHTML='<span class="accent">w</span>ord<span class="accent">s</span>cramble',gameTitle.style.animation="bounceInDown 1s ease forwards",startGameBtn.textContent="Start New Game"}));let guessIndex=0,guessedWord=[];function handleGuesses(e){let t=document.querySelectorAll("#scrambledWordGuessContainer li"),n=t.length,a="abcdefghijklmnopqrstuvwxyz";8==e.keyCode&&0!=guessIndex&&(guessIndex--,t[guessIndex].textContent="",t[guessIndex].classList.remove("pending")),a.includes(e.key)?(t[guessIndex].textContent=e.key,t[guessIndex].classList.add("pending"),guessIndex+=1):a.includes(e.target.textContent)&&(t[guessIndex].textContent=e.target.textContent,t[guessIndex].classList.add("pending"),guessIndex+=1),guessIndex==n&&(t.forEach((e=>{let t=e.textContent;guessedWord.push(t)})),wordToGuess===guessedWord.toString().replace(/,/g,"")?(guessedWord=[],guessIndex=0,handleCorrectLetterAnimations(),progress.style.animation="none",progress.style.background="transparent",setTimeout((()=>{currentStreak++,startNewGame()}),1200)):(guessedWord=[],t.forEach((e=>{e.textContent=""})),handleWrongLetterAnimations(),guessIndex=0))}function handleCorrectLetterAnimations(){let e=scrambledWordGuessContainer.querySelectorAll("li");e.forEach((e=>{e.classList=""})),e.forEach((e=>{e.classList.add("correct")}))}function handleWrongLetterAnimations(){let e=scrambledWordGuessContainer.querySelectorAll("li");e.forEach((e=>{e.classList=""})),e.forEach((e=>{e.classList.add("wrong")})),setTimeout((()=>{e.forEach((e=>{e.classList.remove("wrong")}))}),500)}document.addEventListener("keydown",(e=>{handleGuesses(e)})),keyboard.addEventListener("click",(e=>{if(e.target.classList.contains("backspace-key")){if(0!=guessIndex){let e=document.querySelectorAll("#scrambledWordGuessContainer li");guessIndex--,e[guessIndex].textContent="",e[guessIndex].classList.remove("pending")}}else{document.querySelectorAll("#keyboard li").forEach((t=>{e.target===t&&handleGuesses(e)}))}}));const startGameBtn=document.getElementById("startNewGame"),gameBoard=document.getElementById("gameboard"),overlay=document.getElementById("overlay"),gameTitle=document.getElementById("gameTitle");function showGameboard(e){currentStreak=0,gameStats.style.display="none",howToPlayBtn.setAttribute("disabled",!0),startGameBtn.setAttribute("disabled",!0),gameTitle.innerHTML='<span class="accent">g</span>et<span class="accent">r</span>eady<span class="accent">!</span>',gameTitle.style.animation="bounceInUp 1s ease forwards",setTimeout((()=>{gameTitle.style.animation="bounceOutDown 1s ease forwards"}),4e3),startGameBtn.textContent=`Starting in ${e}...`;let t=setInterval((()=>{e--,startGameBtn.textContent=`Starting in ${e}...`}),1e3);setTimeout((()=>{overlay.style.display="none",gameBoard.style.display="flex",clearInterval(t)}),5e3),startNewGame()}startGameBtn.addEventListener("click",(()=>{showGameboard(5)})),startNewGame();const howToPlayBtn=document.getElementById("howToPlay"),modalContainer=document.getElementById("modalContainer"),closeModalBtn=document.getElementById("closeModal");function toggleModal(){modalContainer.classList.toggle("active")}if(howToPlayBtn.addEventListener("click",toggleModal),closeModalBtn.addEventListener("click",toggleModal),localStorage.scrambleBestStreak||localStorage.setItem("scrambleBestStreak",0),localStorage.scrambleCurrentStreak){document.querySelectorAll(".best-streak span").forEach((e=>{e.textContent=localStorage.scrambleBestStreak}))}else localStorage.setItem("scrambleCurrentStreak",0);function updateStreak(e){if(document.querySelectorAll(".current-streak span").forEach((t=>{t.textContent=e})),currentStreak>localStorage.scrambleBestStreak){localStorage.scrambleBestStreak=Number(currentStreak),document.querySelectorAll(".best-streak span").forEach((e=>{e.textContent=localStorage.scrambleBestStreak}))}}const shareBtn=document.getElementById("share");shareBtn.addEventListener("click",(()=>{let e=document.querySelector("textarea"),t=new Date,n=String(t.getDate()).padStart(2,"0"),a=String(t.getMonth()+1).padStart(2,"0"),s=t.getFullYear();t=a+"/"+n+"/"+s;let r=localStorage.scrambleBestStreak,o=currentStreak;e.textContent=`WordScramble on ${t}:\n    - My all-time best streak: ${r}\n    - My last game's streak was: ${o}\n\nThink you could do better? Give it a try at\ntreehouse.github.io/wordscramble`,e.select(),document.execCommand("copy"),shareBtn.textContent="Copied!",setTimeout((()=>{shareBtn.textContent="Share",e.textContent=""}),3e3)}));