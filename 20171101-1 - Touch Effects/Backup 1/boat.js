var boatImageRight = new Image();   // Create new img element
boatImageRight.src = "Assets/battleship/RedShipRight.png"; // Set source path

var boatImageLeft = new Image();   // Create new img element
boatImageLeft.src = "Assets/battleship/RedShipLeft.png"; // Set source path


class Boat{

  constructor(){
    this.width = 50;
    this.height = 10;
  
    this.color = "rgba(255,255,255,0.40)";
  
    this.pos = new Vector(
      utils.randomRange(0, 1) * width * 4 / 5 + width * 1 / 10,
      height * 1 / 4.5
    );

    this.velocity = new Vector(
      Math.random()*2-1,
      0
    );

    this.image;
  }

  move () {
    this.pos._x += this.velocity._x;
  };

  edge () {
    if (this.pos._x > width) { this.pos._x = -this.width};
    if (this.pos._x < -this.width ) { this.pos._x = width };
  };
  

  draw () {
    this.velocity._x > 0 ? this.image = boatImageRight : this.image = boatImageLeft;
    ctxSea.save();
    ctxSea.translate(this.pos._x, this.pos._y);
    ctxSea.drawImage(
      this.image, // Imagem da sprites sheet toda
      0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
      this.image.width, this.image.height, // Largura e Altura da frame a recortar
      0-this.image.width/6/3.5 , 0-this.image.height/5.25/1.5, // Coordenadas do canto sup esquerdo destino no canvas
      this.image.width/6, this.image.height/5.25 // Largura e Altura da frame a desenhar
    );
    ctxSea.restore();

    /*
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
    */
  };

}
