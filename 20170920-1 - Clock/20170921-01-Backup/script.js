

function setup() {
  createCanvas(windowWidth,windowHeight-4);
  angleMode(DEGREES);
}


function draw() {
  
  background(0);

  strokeWeight(6);  
  stroke("lightgreen");
  
  let hhAngle = map(hour()%12, 0, 12, 0, 360);
  let mmAngle = map(minute(), 0, 60, 0, 360);
  let ssAngle = map(second(), 0, 60, 0, 360);

  translate(windowWidth/2,windowHeight/2);
  rotate(-90);

  push();
  rotate(hhAngle);
  strokeWeight(6);  
  stroke("lightgreen");
  line(0,0, 50, 0);
  pop();

  push();
  rotate(mmAngle);
  strokeWeight(5);  
  stroke("lightblue");
  line(0, 0, 75, 0);
  pop();

  push();
  rotate(ssAngle);
  strokeWeight(4);  
  stroke("pink");
  line(0, 0, 100, 0);
  pop();

  strokeWeight(8);  
  stroke("yellow");
  point(0, 0);

};


