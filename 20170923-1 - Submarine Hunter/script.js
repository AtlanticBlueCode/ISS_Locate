let submarines = [];
let boat;
let mines = [];
let hits = 0;
let shots = 0;
let time;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  for (let i = 0; i < 20; i++) {
    submarines.push(new Submarine);
  };
  boat = new Boat();
};  

function draw() {

  background("lightblue");

  time = Math.floor(millis() / 100)/10;;

  stroke(1);
  text("Hits: "+hits,10,20)
  text("Shots: "+shots,10,40)
  text("Time: "+time,10,60)
  
  noStroke();
  fill("blue");
  rect(0, height / 5, width, height);

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
      };
    };
    if (mines[i].pos.y + mines[i].radius > width) { mines.splice(i, 1) };
  };
  
  boat.draw();
  boat.move();
  boat.edge();
};


function keyReleased() {
  boat.isMovingRight = false;
  boat.isMovingLeft = false;
};

function keyPressed() {
  if (key === 'a' || key === 'A') { boat.isMovingLeft = true; };
  if (key === 'd' || key === 'D') { boat.isMovingRight = true; };
  if (key === 's' || key === 'S') {
    mines.push(new Mine(boat.pos.x + boat.width / 2));
    shots++;
  };
};
