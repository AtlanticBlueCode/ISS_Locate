"use strict"

let canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouseX;
let mouseY;
let clickX;
let clickY;
let timeStart = new Date();
let timeElapsed = 0;

let oldMouseX;
let oldMouseY;

let mouseClicked = false;


window.onload = startup();

ctx.clearRect(0, 0, width, height);

function startup() {
  loop();
};


// Game loop
function loop() {

  ctx.fillStyle = "rgba(255,255,255, 1)";
  ctx.fillRect(0, 0, 300, 140);
  
  timeElapsed = Math.floor((new Date() - timeStart) / 100) / 10;

  ctx.fillStyle = "blue";
  ctx.fillText("Time: " + timeElapsed, 10, 20)
  ctx.fillText("Coord Mouse X " + Math.round(mouseX), 10, 40)
  ctx.fillText("Coord Mouse Y " + Math.round(mouseY), 10, 50)
  ctx.fillText("Coord Old Mouse X " + Math.round(oldMouseX), 10, 70)
  ctx.fillText("Coord Old Mouse Y " + Math.round(oldMouseY), 10, 80)
  ctx.fillText("Coord Click X " + Math.round(clickX), 10, 100)
  ctx.fillText("Coord Click Y " + Math.round(clickY), 10, 110)
  ctx.fillText("Mouse Clicked " + mouseClicked, 10, 130)
  
  ctx.fillStyle = "rgba(255,255,255, 0.025)";
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "blue";

  /*
  var moveToX = function () {
    if (oldMouseX = undefined) { return mouseX } else { return oldMouseX };
  }
  var moveToY = function () {
    if (oldMouseY = undefined) { return mouseY } else { return oldMouseY };
  }
*/
  
  if (mouseClicked) {
    ctx.beginPath();
    ctx.moveTo(oldMouseX == undefined ? clickX : oldMouseX, oldMouseY == undefined ? clickY : oldMouseY);
    ctx.lineTo(mouseX, mouseY);
    oldMouseX = mouseX;
    oldMouseY = mouseY;
    ctx.stroke();
    ctx.closePath();
  } else {
    oldMouseX = undefined;
    oldMouseY = undefined;
    mouseX = undefined;
    mouseY = undefined;
    
    
  }

  requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
  
};


document.body.addEventListener("mousemove", mouseMove,false);
document.body.addEventListener("mousedown", mouseDown,false);
document.body.addEventListener("mouseup", mouseUp,false);

document.body.addEventListener("touchend", touchEnd,false);
document.body.addEventListener("touchstart", touchStart,false);
document.body.addEventListener("touchmove", touchMove,false);

document.body.addEventListener("keydown", keyDown,false);
document.body.addEventListener("keyup", keyUp,false);


function mouseMove(e) {
  e.preventDefault();
  mouseX = e.clientX;
  mouseY = e.clientY;
};

function mouseDown(e) {
  e.preventDefault();
  clickX = e.clientX;
  clickY = e.clientY;
  mouseClicked = true;
};

function mouseUp(e) {
  e.preventDefault();
  mouseClicked = false;
};


function touchMove(e) {
  e.preventDefault();
  mouseX = e.changedTouches[0].clientX;
  mouseY = e.changedTouches[0].clientY;
};

function touchStart(e) {
  e.preventDefault();
  clickX = e.changedTouches[0].clientX;
  clickY = e.changedTouches[0].clientY;
  mouseClicked = true;
};

function touchEnd(e) {
  e.preventDefault();
  mouseClicked = false;
};


function keyUp(e) {
  switch (event.keyCode) {
    case 37: //left
//      boat.velocity._x += -0.0;
      break;
    case 39: //right
//      boat.velocity._x += +0.0;
      break;
    default:
      break;
  };
};  

function keyDown(e) {
  switch (event.keyCode) {
    case 37: //left
//      boat.velocity._x += -0.2;
      break;
    case 39: //right
//      boat.velocity._x += +0.2;
    break;
    case 40: //down
//      mineTimerCheck(new Date().getTime());
        break;
    default:
        break;
  }
};
