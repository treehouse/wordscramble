const startGameBtn=document.getElementById("startNewGame"),gameBoard=document.getElementById("gameboard"),overlay=document.getElementById("overlay"),howToPlayBtn=document.getElementById("howToPlay"),modalContainer=document.getElementById("modalContainer"),closeModalBtn=document.getElementById("closeModal");startGameBtn.addEventListener("click",(()=>{howToPlayBtn.setAttribute("disabled",!0),startGameBtn.setAttribute("disabled",!0);let t=5;startGameBtn.textContent=`Starting in ${t}...`,setInterval((()=>{t--,startGameBtn.textContent=`Starting in ${t}...`}),1e3),setTimeout((()=>{overlay.style.display="none",gameBoard.style.display="flex"}),5e3)})),howToPlayBtn.addEventListener("click",(()=>{modalContainer.classList.add("active")})),closeModalBtn.addEventListener("click",(()=>{modalContainer.classList.remove("active")}));