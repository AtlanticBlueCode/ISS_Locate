

function setup() {
  createCanvas(windowWidth,windowHeight-4);
  angleMode(DEGREES);
}

function draw() {
  
  background(0);

  let hhAngle = map(hour() % 12, 0, 12, 0, 360);
  let mmAngle = map(minute(), 0, 60, 0, 360);
  let ssAngle = map(second(), 0, 60, 0, 360);
  strokeWeight(1);  

/*
  second = frame % framesPerSecond % 60;
  text(second, 20, 20);
  text(frame, 20, 40);
  text(framesPerSecond, 20, 60);
  text(frame%framesPerSecond, 20, 80);
  
  minute = second % 60;
  hour = minute % 60 % 24;
  frame++;
*/
  
  translate(windowWidth/2,windowHeight/2);
  rotate(-90);

  push();
  
  rotate(ssAngle);
  strokeWeight(2);  
  noFill();
  stroke(50, 250, 50);
  //line(0, 0, 100, 0);
  rect(0, -3, 100, 6,5);

  translate(140, 0);
  rotate(-ssAngle+90);
  strokeWeight(1);  
  text(second(), -5, 5);

  pop();


  push();

  rotate(mmAngle);
  strokeWeight(2);  
  noFill();
  stroke(50, 190, 50);
//  line(0, 0, 75, 0);
  rect(0, -3, 75, 6,5);

  translate(160, 0);
  rotate(-mmAngle+90);
  strokeWeight(1);  
  text(minute(), -5, 5);

  pop();


  push();

  rotate(hhAngle);
  strokeWeight(2);  
  noFill();
  stroke(50,160,50);
//  line(0, 0, 50, 0);
  rect(0,-3, 50, 6,5);
  
  translate(180, 0);
  rotate(-hhAngle+90);
  strokeWeight(1);  
  text(hour(), -5, 5);

  pop();

  
  strokeWeight(6);  
  stroke("#00FF00");
  point(0, 0);

  strokeWeight(2);  
  stroke("#00FF00");
  noFill();
  ellipse(0, 0, 230, 230);
  
};


