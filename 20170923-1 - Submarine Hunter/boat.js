function Boat() {

  this.width = 50;
  this.height = 10;  
  this.color = "red";
  
  this.pos = createVector(
    random() * width * 4 / 5 + width * 1 / 10,
    height * 1 / 5 - this.height+2
  );

  this.velocity = createVector(
    0,
    0
  );

  this.draw = function () {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.color);
    stroke("black");
    strokeWeight(1);
    rect(0, 0, this.width, this.height, 0,0,5,5);
    rect(this.width * 3 / 10, -this.height * 2 / 3, this.width * 4 / 10, this.height * 2 / 3, 2, 2, 0, 0);
    rect(this.width * 4 / 10, -this.height, this.width * 2 / 10, this.height*1/3, 2, 2, 0, 0);
    noStroke();
    fill(0, 0, 255, 90);
    rect(0, this.height-2, this.width , 2);
    stroke("black");
    strokeWeight(1);
    fill("darkblue");
    ellipse(this.width * 1 / 4, this.height * 1 / 2, this.height * 2 / 5, this.height * 2/5);
    ellipse(this.width * 2 / 4, this.height * 1 / 2, this.height * 2/5, this.height * 2/5);
    ellipse(this.width * 3 / 4, this.height * 1 / 2, this.height * 2/5, this.height * 2/5);
    pop();
  };

  this.move = function () {
    if (this.isMovingLeft)  { this.pos.x += -2 }
    if (this.isMovingRight) { this.pos.x += 2 }
  };

  this.edge = function () {
    if (this.pos.x > width) { this.pos.x = -this.width};
    if (this.pos.x < -this.width ) { this.pos.x = width };
  };

}