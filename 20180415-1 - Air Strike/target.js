
class Target {

  constructor() {
    this.position = new Vector (width + 20, utils.randomInt(height/10,height/2));
    this.velocity = new Vector (utils.randomInt(-5,-20)/5, 0.001);
    this.acceleration = new Vector(0.001, 0.001);

    this.color = "rgba(255,0,0,0.2)";

    this.radius = 20;

    this.withinEdge = true;
    this.alive = true;

    this.image = imageAirplane;
    this.width = this.image.width * 0.2;
    this.height = this.image.height * 0.2;

    this.waver = 0;
    this.waving = 0;
    
  }

  move() {
    this.position.addTo(this.velocity);
    this.position._y += this.waving;
    this.waver +=0.07;
    this.waving = Math.sin(this.waver)*0.75;
  }

  accelerate() {
    this.velocity.addTo(this.acceleration);
  }

  edge() {
    if (
      this.position._x + this.width < 0      ||
      this.position._x - this.width > width  ||
      this.position._y - this.height > height ||
      this.position._y + this.height < 0
      ){
      
      this.withinEdge = false;
      } else {
      this.withinEdge = true
      }
  };

  draw() {
/*
    canvases[0].context.beginPath();
    canvases[0].context.fillStyle = this.color;
    canvases[0].context.strokeStyle = "rgba(0,0,0,1)";
    canvases[0].context.arc(this.position._x, this.position._y, this.radius, 0, 2 * Math.PI);
    canvases[0].context.fill();
    canvases[0].context.stroke();
*/

/*
    canvases[0].context.beginPath();
    canvases[0].context.fillStyle = this.color;
    canvases[0].context.strokeStyle = "rgba(0,0,0,1)";
    canvases[0].context.rect(this.position._x, this.position._y, this.image.width*0.25, this.image.height*0.25);
    canvases[0].context.fill();
    canvases[0].context.stroke();
*/

    canvases[0].context.save();
    canvases[0].context.translate(this.position._x, this.position._y);
    //canvases[0].context.globalAlpha=0.5;
    canvases[0].context.drawImage(
      this.image, // Imagem da sprites sheet toda
      0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
      this.image.width, this.image.height, // Largura e Altura da frame a recortar
      0 , 0, // Coordenadas do canto sup esquerdo destino no canvas
      this.width , this.height  // Largura e Altura da frame a desenhar
    );
    canvases[0].context.restore();
  }

  hit (circle){
    if(
    ( circle.position._x                  < this.position._x                &&
      circle.position._x + circle.radius  > this.position._x                &&
      circle.position._y - circle.radius  > this.position._y                &&
      circle.position._y + circle.radius  < this.position._y + this.height) ||

    ( circle.position._x                  > this.position._x + this.width   &&
      circle.position._x - circle.radius  < this.position._x + this.width   &&
      circle.position._y - circle.radius  > this.position._y                &&
      circle.position._y + circle.radius  < this.position._y + this.height) ||

    ( circle.position._x + circle.radius  > this.position._x                &&
      circle.position._x - circle.radius  < this.position._x + this.width   &&
      circle.position._y + circle.radius  > this.position._y                &&
      circle.position._y                  < this.position._y)               ||

    ( circle.position._x + circle.radius  > this.position._x                &&
      circle.position._x - circle.radius  < this.position._x + this.width   &&
      circle.position._y - circle.radius  < this.position._y + this.height  &&
      circle.position._y                  > this.position._y + this.height)
    
       ){
      console.log ("Hit!");
      this.alive = false; 
      return true;
    }
    /*
      if(utils.distance(this.position, cannonball.position) <= this.radius + cannonball.radius){
      this.alive = false; 
      return true;
      */
  }
}