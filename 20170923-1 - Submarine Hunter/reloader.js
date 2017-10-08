function Reloader (x,y) {

  this.height = 0;

  this.pos = new vector(x, y);

  this.draw = function () {

//    console.log(mineReloadTimer);
    this.height = Math.min(utils.map(mineReloadTimer, 0, mineReloadTime, 0, 50),50);    
    
    ctxSea.save();
    
    ctxSea.translate(this.pos._x, this.pos._y);

    ctxSea.fillStyle = "salmon";
    ctxSea.strokeStyle = "black";
    ctxSea.lineWidth = 1;

    ctxSea.beginPath();
    ctxSea.rect(0, 0, 10, -50);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();

    ctxSea.fillStyle = "green";
    ctxSea.strokeStyle = "black";

    ctxSea.beginPath();
    ctxSea.rect(0,0,10, -this.height);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();

    ctxSea.restore();
    
  };

}