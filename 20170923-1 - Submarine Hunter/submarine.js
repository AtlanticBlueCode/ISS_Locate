var subA_RightImage = new Image();   // Create new img element
subA_RightImage.src = "Assets/submarine/SubA_Right.png"; // Set source path

var subA_LeftImage = new Image();   // Create new img element
subA_LeftImage.src = "Assets/submarine/SubA_Left.png"; // Set source path


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

    this.image;
    
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
    this.velocity._x > 0 ? this.image = subA_RightImage : this.image = subA_LeftImage;
    ctxSea.save();
    ctxSea.translate(this.pos._x, this.pos._y);
    ctxSea.drawImage(
      this.image, // Imagem da sprites sheet toda
      0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
      this.image.width, this.image.height, // Largura e Altura da frame a recortar
      0 , 0-this.image.height/2, // Coordenadas do canto sup esquerdo destino no canvas
      this.image.width*0.7 , this.image.height*0.7  // Largura e Altura da frame a desenhar
    );
    ctxSea.restore();

/*
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
*/
  };

}