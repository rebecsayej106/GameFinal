class GameManager {
    constructor(camera, player, sands) {
      this.player = player;
      this.sands = sands;
      this.camera = camera;
      this.colors = ["red", "green", "blue", "orange", "turquoise", "yellow"];
      this.currentColorIndex = 0;
      this.ischanged = false;
      this.isPaused = false;
      this.isChangedCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6:0,
      };
    }

  setup (){
  const pauseButton = document.getElementById('pause');
  pauseButton.addEventListener('click', pauseGame);
  resetGame();
  }
  getNewColorIndex(currentIndex, array) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * array.length);
      } while (newIndex === currentIndex);
      return newIndex;
    }
  deccrementScore() {
    if (this.player.checkGameOver())
      {
        // const messageDiv = document.getElementById('message');
        //     messageDiv.innerHTML = `
        //     <p class="message-title">Game Over!</p>
        //     <p class="score-text">Your Score: ${this.player.getScore()} </p>
        //     <p class="lives-text">Remaining Lives: ${this.player.getLives()}</p>
        //     <p class="noseMove"> Nose ${this.isChangedCount[1]}</p>
        //     <p class="left_wristMove"> left_wrist ${this.isChangedCount[2]}</p>
        //     <p class="right_wristMove"> right_wrist ${this.isChangedCount[3]}</p>
        //     <p class="left_hipMove"> left_hip and right_hip ${this.isChangedCount[4]}</p>
        //     <p class="right_ankle"> right_ankle ${this.isChangedCount[5]}</p>
        //     <p class="left_ankle"> left_ankle ${this.isChangedCount[6]}</p>
            
        // `;

        const messageDiv = document.getElementById('message');

// Create table rows dynamically based on isChangedCount
let tableRows = `
  <div class="table-row table-header">
    <div class="table-cell">Body Part</div>
    <div class="table-cell">Move Count</div>
  </div>
`;

const bodyParts = [
  { name: "Nose", count: this.isChangedCount[1] },
  { name: "Left Wrist", count: this.isChangedCount[2] },
  { name: "Right Wrist", count: this.isChangedCount[3] },
  { name: "Left & Right Hip", count: this.isChangedCount[4] },
  { name: "Right Ankle", count: this.isChangedCount[5] },
  { name: "Left Ankle", count: this.isChangedCount[6] },
];

bodyParts.forEach(part => {
  tableRows += `
    <div class="table-row">
      <div class="table-cell">${part.name}</div>
      <div class="table-cell">${part.count}</div>
    </div>
  `;
});

messageDiv.innerHTML = `
  <p class="message-title">Game Over!</p>
  <p class="score-text">Your Score: ${this.player.getScore()} </p>
  <p class="lives-text">Remaining Lives: ${this.player.getLives()}</p>
  <div class="results-table">
    ${tableRows}
  </div>
`;

            messageDiv.style.display = 'inline-flex';
    
            const newGameButton = document.getElementById('newgame');
            messageDiv.style.display = 'inline-block';
    
            const messagepuse = document.getElementById('pause');
            messagepuse.style.display = 'none';

              noLoop(); 
          }else {this.player.loseLife();  }
      updateScoreDisplay(this.player);       
  }

  incrementScore() {

    if (this.player.checkWin())
    {
        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = `
        <p class="message-title">YOU WIN! </p>
        <p class="score-text">Your Score: ${this.player.getScore()} </p>
        <p class="lives-text">Remaining Lives: ${this.isChangedCount[1]}</p>
    `;
        messageDiv.style.display = 'block';
        const messagepuse = document.getElementById('pause');
        messagepuse.style.display = 'none';
          noLoop();  }
          else{

            this.player.gainScore();  
          }
      updateScoreDisplay(this.player);       
      this.ischanged = true; 
  }

  draw() {
    if (this.isPaused) return;

    const progress = (frameCount % 360) / 360;

    if (frameCount % 360 === 0) {
      this.currentColorIndex = this.getNewColorIndex(this.currentColorIndex, this.colors);
      if (!this.ischanged) {
        this.deccrementScore();
      } else {
        this.ischanged = false;
      }
    }
    this.updateLoadingBar(progress);
    let currentColor = this.colors[this.currentColorIndex];
    this.camera.draw();
    removeBackgroundColor();
    drawBackground(this.currentColorIndex);
    stroke(currentColor);
    strokeWeight(5);
    line(0, height - 10, width, height - 5);
    const message = this.camera.getMessageForKeypoint();
  
    if (message == 1 && this.currentColorIndex == 0) {
      this.detectedPoint(this.camera.getX(), this.camera.getY(), currentColor);
      if (!this.ischanged) {
        this.incrementScore();
        this.isChangedCount[1]++;

      }
    }
    if (message == 2 && this.currentColorIndex == 1) {
      this.detectedPoint(this.camera.getX(), this.camera.getY(), currentColor);
    
      if (!this.ischanged) {
        this.incrementScore();
        this.isChangedCount[2]++;
      }
    }
    if (message == 3 && this.currentColorIndex == 2) {
      this.detectedPoint(this.camera.getX(), this.camera.getY(), currentColor);
      if (!this.ischanged) {
        this.incrementScore();
        this.isChangedCount[3]++;
      }
    }
    if ((message == 4 || message == 5) && this.currentColorIndex == 3) {
      this.detectedPoint(this.camera.getX(), this.camera.getY(), currentColor);
      if (!this.ischanged) {
        this.incrementScore();
        this.isChangedCount[4]++;
      }
    }
    if (message == 6 && this.currentColorIndex == 4) {
      this.detectedPoint(this.camera.getX(), this.camera.getY(), currentColor);
      if (!this.ischanged) {
        this.incrementScore();
        this.isChangedCount[5]++;
      }
    }
    if (message == 7 && this.currentColorIndex == 5) {
      this.detectedPoint(this.camera.getX(), this.camera.getY(), currentColor);
      if (!this.ischanged) {
        this.incrementScore();
        this.isChangedCount[4]++;
      }
    }
  }
  
  updateLoadingBar(progress) {
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) {
      loadingBar.style.width = `${progress * 100}%`;
    }
  }
  



  detectedPoint(x, y, colorInd) {
    this.sands.update();
    this.sands.draw();
    this.sands.mouseDragged(x, y, colorInd);
  }
  
}

function updateScoreDisplay(player) {
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.textContent = "Score: "+player.getScore();
  
  const livesContainer = document.getElementById('lives-container');
  livesContainer.innerHTML = '';
  let lives = player.getLives();
  let imageSrc;
  if (lives === 3) {
    imageSrc = 'images/smile.png'; 
  } else if (lives === 2) {
    imageSrc = 'images/worried.png';
  } else if (lives === 1) {
    imageSrc = 'images/angry.png';
  }
  
  for (let i = 0; i < lives; i++) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Life_Icon';
    img.className = 'liveIcon';
    livesContainer.appendChild(img);
  }
  
}

function resetGame() {
  removeBackgroundColor();
  this.player.lives = 3;
  this.player.score = 0;
  this.updateScoreDisplay(this.player);  
}

function startNewGame() {
  location.reload();
}

document.getElementById("newgame").addEventListener("click", () => {
  startNewGame();
});

function drawBackground(colorInd){
  if (colorInd == 0){
    const iDName = document.getElementById('nose'); 
    iDName.style.backgroundColor = "#918ca4"; 
  }
  if (colorInd == 1){
    
    const iDName = document.getElementById('left_wrist'); 
    iDName.style.backgroundColor = "#918ca4"; 
  }
  if (colorInd == 2){
    const iDName = document.getElementById('right_wrist'); 
    iDName.style.backgroundColor = "#918ca4"; 
  }
  if (colorInd == 3){
    const iDName = document.getElementById('left_hip'); 
    iDName.style.backgroundColor = "#918ca4"; 
    const iDName2 = document.getElementById('right_hip'); 
    iDName2.style.backgroundColor = "#918ca4"; 
  }
  if (colorInd == 4){
    
    const iDName = document.getElementById('left_ankle'); 
    iDName.style.backgroundColor = "#918ca4"; 
  }
  if (colorInd == 5){
    const iDName = document.getElementById('right_ankle'); 
    iDName.style.backgroundColor = "#918ca4"; 
  }
}
function removeBackgroundColor() {
  const elements = document.querySelectorAll('.resetme'); 
  elements.forEach(element => {
    element.style.cssText = `
    background-color: transparent;
    border-radius: 1rem;
    padding: 10px;
  `;
  });
   
 }

function pauseGame() {

  if (this.isPaused) {
      loop();
      this.isPaused = false;
      document.getElementById('pause').textContent = "Pause"; 
  } else {
      noLoop();
      this.isPaused = true;
      document.getElementById('pause').textContent = "Resume";
  }
}




