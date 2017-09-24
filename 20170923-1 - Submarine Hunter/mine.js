function Mine(pos_x) {

  this.radius = 5;

  this.pos = new vector(pos_x, boat.pos._y + boat.height);

  this.velocity = new vector(0, 5);
  
  this.draw = function () {
    ctxSea.save();

    ctxSea.fillStyle = "yellow";
    ctxSea.strokeStyle = "black";
    ctxSea.lineWidth = 1;

    ctxSea.beginPath();
    ctxSea.ellipse(this.pos._x, this.pos._y, this.radius, this.radius,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();

    ctxSea.restore();
  };

  this.move = function () {
    this.pos._x += this.velocity._x;
    this.pos._y += this.velocity._y;
  };

  this.hits = function (submarine) {
    if (this.pos._x + this.radius > submarine.pos._x &&
      this.pos._x - this.radius < submarine.pos._x + submarine.width &&
      this.pos._y + this.radius > submarine.pos._y &&
      this.pos._y - this.radius < submarine.pos._y + submarine.height
    ) { return true }
  };


}