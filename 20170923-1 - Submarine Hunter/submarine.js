function Submarine() {
  
  this.width = 30;
  this.height = 10;  
  this.color = color(200, random(0, 200),random(0,200));
  
  this.pos = createVector(
    random() * width * 4 / 5 + width * 1 / 10,
    random() * height * 3 / 5 + height * 3 / 10
  );

  this.velocity = createVector(
    (random(-1, 1) > 0 ? 1 : -1) * random(0.5,1.5),
    0
  );

  this.draw = function () {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.color);
    stroke("black");
    strokeWeight(1);
    rect(0, 0, this.width, this.height, 4);
    rect(this.width * 1 / 3, -this.height * 1 / 4, this.width * 1 / 3, this.height * 1 / 4, 2, 2, 0, 0);
    fill("darkblue");
    ellipse(this.width * 1 / 4, this.height * 1 / 2, this.height * 2 / 5, this.height * 2/5);
    ellipse(this.width * 2 / 4, this.height * 1 / 2, this.height * 2/5, this.height * 2/5);
    ellipse(this.width * 3 / 4, this.height * 1 / 2, this.height * 2/5, this.height * 2/5);
    pop();
  };

  this.move = function () {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  };

  this.edge = function () {
    if (this.pos.x > width) { this.pos.x = -this.width};
    if (this.pos.x < -this.width ) { this.pos.x = width };
  };

}