

function setup() {
  createCanvas(windowWidth,windowHeight-4);
  angleMode(DEGREES);
}

let frame = 1/60;
//let second = 0;
//let minute = 0;
//let hour = 0;

function draw() {
  
  background(0,);

  let hhAngle = map(hour()*1 % 12, 0, 12, 0, 360);
  let mmAngle = map(minute()*1, 0, 60, 0, 360);
  let ssAngle = map(second()*1, 0, 60, 0, 360);
  strokeWeight(1);  

/*
  second +=frame;
  if (Math.floor(second + frame) === 60) {
    second = 0;
    if (Math.floor(minute + 1) === 60) {
      minute = 0;
      if (Math.floor(hour + 1) === 12) {
        hour = 0;
      }
      else hour += 1;
    }
    else minute += 1
  }
*/
  
  /*
  text(Math.floor(second),  10, 20);
  text(Math.floor(minute),  10, 40);
  text(Math.floor(hour),    10, 60);
  text(frame, 10, 100);
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
  text(Math.floor(second()), -5, 5);

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
  text(Math.floor(minute()), -5, 5);

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
  text(Math.floor(hour()), -5, 5);

  pop();

  
  strokeWeight(6);  
  stroke("#00FF00");
  point(0, 0);

  strokeWeight(2);  
  stroke("#00FF00");
  noFill();
  ellipse(0, 0, 230, 230);
  
};


