class Player {
  constructor() {
      this.lives = 3;
      this.score = 0;
  }

  setScore(score) {
    this.score = score;
   }
 
   getScore() {
     return this.score;   
   }
 
   setLives(lives) {
    this.lives = lives;
   }
 
   getLives() {
     return this.lives;   
   }
 
  gainScore() {
      if (this.score < 5) {
          this.score++;
      }
      // this.checkWin();
  }

  loseLife() {
      if (this.lives > 0) {
          this.lives--;
      }
      this.checkGameOver();
  }

  checkWin() {
      if (this.score == 5) 
        return true;
      }
    

  checkGameOver() {
      if (this.lives == 0) 
        return true;
  }
}

