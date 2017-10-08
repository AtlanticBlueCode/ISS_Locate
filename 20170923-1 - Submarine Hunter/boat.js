function Boat() {

  this.width = 50;
  this.height = 10;  
  
  this.color = "rgba(255,0,0,0.40)";
  
  this.pos = new vector(
    utils.randomRange(0,1) * width * 4 / 5 + width * 1 / 10,
    height * 1 / 5 - this.height + 3
  );

  this.velocity = new vector(
    0,
    0
  );

  this.move = function () {
    if (this.isMovingLeft) {  this.velocity._x += -0.1 }
    if (this.isMovingRight) { this.velocity._x += 0.1 }
    this.pos._x += this.velocity._x;
  };

  this.edge = function () {
    if (this.pos._x > width) { this.pos._x = -this.width};
    if (this.pos._x < -this.width ) { this.pos._x = width };
  };

  this.draw = function () {
    ctxSea.save();

    ctxSea.translate(this.pos._x, this.pos._y);

    ctxSea.fillStyle = this.color;
    ctxSea.strokeStyle = "black";
    ctxSea.lineWidth = 1;

    ctxSea.beginPath(); 
    utils.roundRect(ctxSea,0, 0, this.width, this.height,{ tl: 0, tr: 0, br: 4, bl: 4 });
    ctxSea.closePath(); 
    ctxSea.fill();
    ctxSea.stroke();

    ctxSea.beginPath(); 
    ctxSea.rect(this.width * 3 / 10, -this.height * 2 / 3, this.width * 4 / 10, this.height * 2 / 3);
    ctxSea.rect(this.width * 4 / 10, -this.height, this.width * 2 / 10, this.height*1/3);
    ctxSea.closePath(); 
    ctxSea.fill();
    ctxSea.stroke();

    
    ctxSea.strokeStyle = "black";
    ctxSea.fillStyle = "darkblue";
    ctxSea.lineWidth = 1;
    
    ctxSea.beginPath(); 
    ctxSea.ellipse(this.width * 1 / 4, this.height * 1 / 2, this.height * 1 / 5, this.height * 1 / 5,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();
    ctxSea.beginPath(); 
    ctxSea.ellipse(this.width * 2 / 4, this.height * 1 / 2, this.height * 1/5, this.height * 1/5,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();
    ctxSea.beginPath(); 
    ctxSea.ellipse(this.width * 3 / 4, this.height * 1 / 2, this.height * 1/5, this.height * 1/5,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();

    
    ctxSea.restore();
  };

}
