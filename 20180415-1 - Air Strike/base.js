
class Base {
  constructor (){
    this.position = new Vector(55,height-55);
    this.radius = 20;
    this.range = 50;

  };

  draw(){
    canvases[2].context.beginPath();
    canvases[2].context.fillStyle = 'rgba(0,0,0, 0.02)';
    canvases[2].context.strokeStyle = "lightgrey";
    canvases[2].context.arc(this.position._x, this.position._y,this.range, 0, 2 * Math.PI);
    canvases[2].context.fill();
    canvases[2].context.stroke();
    
    canvases[2].context.beginPath();
    canvases[2].context.fillStyle = "red";
    canvases[2].context.strokeStyle = "black";
    canvases[2].context.arc(this.position._x, this.position._y,this.radius, 0, 2 * Math.PI);
    canvases[2].context.fill();
    canvases[2].context.stroke();
  };

}
