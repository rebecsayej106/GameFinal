class Sands {
    constructor(w) {
      this.w = w;
      this.cols = Math.floor(width / this.w);
      this.rows = Math.floor(height / this.w); 
      this.grid = this.make2DArray(this.cols, this.rows);
      this.velocityGrid = this.make2DArray(this.cols, this.rows, 1);
      this.gravity = 0.1; 
    }
  
    make2DArray(cols, rows, defaultValue = 0) {
      let arr = new Array(cols);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(defaultValue);
      }
      return arr;
    }
  
    withinCols(i) {
      return i >= 0 && i <= this.cols - 1;
    }
  
    withinRows(j) {
      return j >= 0 && j <= this.rows - 1;
    }
  
    mouseDragged(mouseX, mouseY, currentColor) {
      let mouseCol = Math.floor(mouseX / this.w);
      let mouseRow = Math.floor(mouseY / this.w);
  
      let matrix = 5;
      let extent = Math.floor(matrix / 2);
      for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
          if (Math.random() < 0.75) {
            let col = mouseCol + i;
            let row = mouseRow + j;
            if (this.withinCols(col) && this.withinRows(row)) {
              this.grid[col][row] = currentColor;
              this.velocityGrid[col][row] = 1;
            }
          }
        }
      }
    }
  
    update() {
      let nextGrid = this.make2DArray(this.cols, this.rows);
      let nextVelocityGrid = this.make2DArray(this.cols, this.rows);
  
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          let state = this.grid[i][j];
          let velocity = this.velocityGrid[i][j];
          let moved = false;
  
          if (state) {
            let newPos = Math.floor(j + velocity);
            for (let y = newPos; y > j; y--) {
            //   if (y >= this.rows - 1) break; // Stop if particle reaches the bottom
  
              let below = this.grid[i][y];
              let dir = 1;
              if (Math.random() < 0.5) {
                dir *= -1;
              }
              let belowA = -1;
              let belowB = -1;
              if (this.withinCols(i + dir)) belowA = this.grid[i + dir][y];
              if (this.withinCols(i - dir)) belowB = this.grid[i - dir][y];
  
              if (!below) {
                nextGrid[i][y] = state;
                nextVelocityGrid[i][y] = velocity + this.gravity;
                moved = true;
                break;
              } else if (!belowA) {
                nextGrid[i + dir][y] = state;
                nextVelocityGrid[i + dir][y] = velocity + this.gravity;
                moved = true;
                break;
              } else if (!belowB) {
                nextGrid[i - dir][y] = state;
                nextVelocityGrid[i - dir][y] = velocity + this.gravity;
                moved = true;
                break;
              }
            }
          }
  
          if (state && !moved) {
            nextGrid[i][j] = this.grid[i][j];
            nextVelocityGrid[i][j] = this.velocityGrid[i][j] + this.gravity;
          }
        }
      }
  
      this.grid = nextGrid;
      this.velocityGrid = nextVelocityGrid;
    }


    draw() {
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          noStroke();
      
         
          if (this.grid[i][j]) {
            noStroke();
            fill(this.grid[i][j]);
            let x = i * this.w;
            let y = j * this.w;
            square(x, y, this.w);
          }
        }
      }
    }
  }
  