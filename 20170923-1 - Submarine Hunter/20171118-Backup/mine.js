var mineImage = new Image();
mineImage.src = "Assets/bomb/DepthCharge.png"; // Set source path


class Mine {

  constructor(pos_x) {
    this.hit = false;
    this.radius = 5;
    this.rotation = Math.floor(Math.random() * 2 * Math.PI)*Math.floor(Math.random()*2-1);
    this.rotationVelocity = (Math.random() > 0.5 ? 1 : -1) * (Math.random()*0.05+0.025);
    this.pos = new Vector(pos_x, boat.pos._y + boat.height);
    this.velocity = new Vector(0, 2.5);
  }
  
  move () {
    this.pos._x += this.velocity._x;
    this.pos._y += this.velocity._y;
    this.rotation += this.rotationVelocity;
  };

  hits (submarine) {
    if (  this.pos._x + 0*this.radius > submarine.pos._x &&
          this.pos._x - 0*this.radius < submarine.pos._x + submarine.width &&
          this.pos._y + 0*this.radius > submarine.pos._y &&
          this.pos._y - 0*this.radius < submarine.pos._y + submarine.height
    ) { return true }
  };

  draw () {
    ctxSea.save();
    ctxSea.translate(this.pos._x, this.pos._y);
    ctxSea.rotate(this.rotation);
    ctxSea.drawImage(
      mineImage, // Imagem da sprites sheet toda
      0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
      mineImage.width, mineImage.height, // Largura e Altura da frame a recortar
      0-mineImage.width/6/2, 0-mineImage.height/6/2, // Coordenadas do canto sup esquerdo destino no canvas
      mineImage.width / 6, mineImage.height / 6 // Largura e Altura da frame a desenhar
    );
    ctxSea.restore();
  

/*
    ctxSea.save();

    ctxSea.fillStyle = "black";
    ctxSea.strokeStyle = "white";
    ctxSea.lineWidth = 1;

    ctxSea.beginPath();
    ctxSea.ellipse(this.pos._x, this.pos._y, this.radius, this.radius,0,0,Math.PI*2);
    ctxSea.closePath();
    ctxSea.fill();
    ctxSea.stroke();

    ctxSea.restore();
*/  

  };

  explosion () {
    drawExplosion(this.pos._x, this.pos._y);
  };

}