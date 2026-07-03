const bird = document.querySelector(".bird-png");
const game = document.querySelector(".game");

let birdPosition = 250;
let gravity = 2;
let isGameOver = false;
let score = 0;

setInterval(() => {
  if(isGameOver) return;
  birdPosition += gravity;
  bird.style.top = birdPosition + "px";

  if(birdPosition > game.clientHeight || birdPosition < 0){
    gameOver();
  }
}, 20);

document.addEventListener("keypress", (e) => {
  if (e.code === "Space") {
    birdPosition -= 60;
    bird.style.top = birdPosition + "px";
  }
});

function createPipe() {
  if(isGameOver) return;
  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");
 
 pipeTop.classList.add("pipe", "pipe-top");
pipeBottom.classList.add("pipe", "pipe-bottom");

  let gap = 100;
  let scored = false;

  let gameHeight = game.clientHeight;
  let minHeight = 70;
  let maxPipeHeight = gameHeight - minHeight - gap;

  let topHeight = Math.random() * maxPipeHeight + 50;
  let bottomHeight = maxPipeHeight - topHeight - gap;

  pipeTop.style.height = topHeight + "px";
  pipeBottom.style.height = bottomHeight + "px";

  pipeTop.style.top = 0;
  pipeBottom.style.bottom = 0;

  game.append(pipeTop,pipeBottom);

  let pipeX = game.clientWidth;

  pipeTop.style.left = pipeX + "px";
  pipeBottom.style.left = pipeX + "px";

  let move = setInterval(() => {
     if(isGameOver) return;
    
    pipeX -= 2;
    pipeTop.style.left = pipeX + "px";
    pipeBottom.style.left = pipeX + "px";


    let birdRect = bird.getBoundingClientRect();
    let pipeTopRect = pipeTop.getBoundingClientRect();
    let pipeBottomRect = pipeBottom.getBoundingClientRect();

    if(birdRect.left > pipeTopRect.right && scored === false){
      score++;
      scored = true;
    }
    if(birdRect.right > pipeTopRect.left && birdRect.left < pipeTopRect.right && (birdRect.top < pipeTopRect.bottom || birdRect.bottom > bottomHeight.top) ){
      gameOver();
      clearInterval(move);
    }
    
    if(pipeX < -50){
      pipeTop.remove();
      pipeBottom.remove();
      clearInterval(move);
    }
  },20);


}

createPipe();

setInterval(createPipe, 2000);


function gameOver(){
    if(isGameOver) return;

    isGameOver = true;
    overlay(score);
}

function overlay(score){
  const over = document.createElement("div");
  over.classList.add("game-over-overlay");

  over.innerHTML = `
  <h1>Game Over</h1>
  <h2>Score : ${score} </h2>
  <button onclick = "location.reload()">Play Again</button>
  `;

  game.appendChild(over);
}
