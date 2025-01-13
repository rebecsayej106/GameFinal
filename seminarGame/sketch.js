

function preload() {
  this.camera = new Camera(); 
  this.camera.preload();

}


function setup() {
  const canvas = createCanvas(800, 500);
  canvas.parent('canvas-container'); 
  this.player = new Player();
  
  this.sand = new Sands(5);
  this.camera.setup();
  gameManager = new GameManager(this.camera, this.player, this.sand);
  gameManager.setup();

}

function draw() {
  background(0);
 
  gameManager.draw();


 }

 