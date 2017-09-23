

function setup() {
  createCanvas(windowWidth,windowHeight-4);
  angleMode(DEGREES);
}


function draw() {
  
  background(0);

  strokeWeight(6);  
  stroke("lightgreen");
  
  let hhAngle = map(hour() % 12, 0, 12, 0, 360);
  let mmAngle = map(minute(), 0, 60, 0, 360);
  let ssAngle = map(second(), 0, 60, 0, 360);

  translate(windowWidth/2,windowHeight/2);
  rotate(-90);

  push();
  rotate(hhAngle);
  strokeWeight(6);  
  stroke(50,160,50);
  line(0,0, 50, 0);
  strokeWeight(1);  
  translate(180, 0);
  rotate(-hhAngle+90);
  text(hour(), -5, 5);
  pop();

  push();
  rotate(mmAngle);
  strokeWeight(5);  
  stroke(50,190,50);
  line(0, 0, 75, 0);
  strokeWeight(1);  
  translate(160, 0);
  rotate(-mmAngle+90);
  text(minute(), -5, 5);
  pop();

  push();
  rotate(ssAngle);
  strokeWeight(4);  
  stroke(50,250,50);
  line(0, 0, 100, 0);
  strokeWeight(1);  
  translate(140, 0);
  rotate(-ssAngle+90);
  text(second(), -5, 5);
  pop();

  strokeWeight(4);  
  stroke("white");
  point(0, 0);

  noFill();
  ellipse(0, 0, 230, 230);
  

};


