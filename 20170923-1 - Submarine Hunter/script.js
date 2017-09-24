"use strict"

let mines = [];
let hits = 0;
let shots = 0;
let timeStart = new Date();
let timeElapsed;

let canvasSea = document.getElementById("canvasSea"),
ctxSea = canvasSea.getContext("2d");

let canvasExplosion = document.getElementById("canvasExplosion"),
ctxExplosion = canvasExplosion.getContext("2d");

let width = canvasSea.width = canvasExplosion.width = window.innerWidth;
let height = canvasSea.height = canvasExplosion.height = window.innerHeight;

let submarines = [];
for (let i = 0; i < 25; i++) {
  submarines.push(new Submarine);
};

let boat = new Boat();

window.onload = loop();

// Game loop
function loop() {

  ctxSea.fillStyle = "lightblue";
//  ctxSea.rect (0, 0,width, height);
  ctxSea.fillRect(0, 0,width, height);

  ctxSea.fillStyle = "blue";
//  ctxSea.rect (0, height * 1 / 5, width, height*3/5);
  ctxSea.fillRect(0, height * 1 / 5, width, height);

  
  timeElapsed = Math.floor((new Date()-timeStart)/100)/10;

  ctxSea.lineWidth=10;
  ctxSea.fillStyle = "black";
  ctxSea.fillText("Shots: "+shots,10,20)
  ctxSea.fillText("Hits: " + hits, 10, 30)
  ctxSea.fillText("Submarines: " + submarines.length, 10, 40)
  ctxSea.fillText("Time: "+timeElapsed,10,50)
  

  for (let i = 0; i < submarines.length; i++){
    submarines[i].draw();
    submarines[i].move();
    submarines[i].edge();    
  };

  for (let i = 0; i < mines.length; i++){
    mines[i].draw();
    mines[i].move();
    for (let j = 0; j < submarines.length; j++) {
      if (mines[i].hits(submarines[j])) {
        submarines.splice(j, 1);
        hits++;
//        mines.splice(i, 1);
      };
    };
    if (mines[i].pos.y + mines[i].radius > width) { mines.splice(i, 1) };
  };
  
  boat.draw();
  boat.move();
  boat.edge();


  requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
  
  
};


document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);


function keyUp(e) {
  switch (event.keyCode) {
    case 37: //left
      boat.isMovingLeft = false;
      break;
    case 39: //right
      boat.isMovingRight = false;
      break;
    default:
      break;
  };
};  

function keyDown(e) {
  switch (event.keyCode) {
    case 37: //left
      boat.isMovingLeft = true;
      break;
    case 39: //right
      boat.isMovingRight = true;
      break;
    case 40: //down
    mines.push(new Mine(boat.pos._x + boat.width / 2));
    shots++;
        break;
    default:
        break;
  }
};
