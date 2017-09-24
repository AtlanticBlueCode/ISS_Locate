function Mine(posX) {

  this.radius = 5;

  this.pos = createVector(posX, boat.pos.y + boat.height);

  this.velocity = createVector(0, 5);
  
  this.draw = function () {
    push();
    stroke("black");
    strokeWeight(1);
    fill("darkblue");
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    pop();
  };

  this.move = function () {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  };

  this.hits = function (submarine) {
    if (this.pos.x + this.radius > submarine.pos.x &&
      this.pos.x - this.radius < submarine.pos.x + submarine.width &&
      this.pos.y + this.radius > submarine.pos.y &&
      this.pos.y - this.radius < submarine.pos.y + submarine.height
    ) { return true }
  };


}