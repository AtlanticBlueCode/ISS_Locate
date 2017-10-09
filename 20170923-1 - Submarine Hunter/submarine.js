
class Submarine {

  constructor() {
    this.width = Math.max(width / 25, 30);
    this.height = 10;

    this.color = utils.getRandomColorRGB();
  
    this.pos = new Vector(
      utils.randomRange(0, 1) * width * 4 / 5 + width * 1 / 10,
      utils.randomRange(0, 1) * height * 3 / 5 + height * 3 / 10
    );

    this.velocity = new Vector(
      (utils.randomRange(-1, 1) > 0 ? 1 : -1) * utils.randomRange(0.5, 1.5),
      0
    );
  };

  move () {
    this.pos._x += this.velocity._x;
    this.pos._y += this.velocity._y;

  };

  edge () {
    if (this.pos._x > width) { this.pos._x = -this.width};
    if (this.pos._x < -this.width ) { this.pos._x = width};
  };

  draw () {
    ctxSea.save();

    ctxSea.translate(this.pos._x, this.pos._y);
    
    ctxSea.fillStyle = this.color;
    ctxSea.strokeStyle = "black";
    ctxSea.lineWidth = 1;

    ctxSea.beginPath();
    utils.roundRect (ctxSea, 0, 0, this.width, this.height);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();

    ctxSea.beginPath();
    utils.roundRect (ctxSea, this.width * 1 / 3, -this.height * 1 / 4, this.width * 1 / 3, this.height * 1 / 4,2);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();


    ctxSea.fillStyle = "darkblue";
    ctxSea.strokeStyle = "black";
    ctxSea.lineWidth = 1;
    
    ctxSea.beginPath();
    ctxSea.ellipse (this.width * 1 / 4, this.height * 1 / 2, this.height * 2 / 10, this.height * 2 / 10,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.stroke();
    ctxSea.fill();
    ctxSea.beginPath();
    ctxSea.ellipse (this.width * 2 / 4, this.height * 1 / 2, this.height * 2 / 10, this.height * 2 / 10,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.stroke();
    ctxSea.fill();
    ctxSea.beginPath();
    ctxSea.ellipse (this.width * 3 / 4, this.height * 1 / 2, this.height * 2 / 10, this.height * 2 / 10,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.stroke();
    ctxSea.fill();
    
    
    ctxSea.restore();
  };

}