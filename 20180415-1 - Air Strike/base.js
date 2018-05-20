
class Base {
  constructor (){
    this.position = new Vector(55,height-55);
    this.radius = 8;
    this.range = 50;

  };

  draw(){
    canvases[1].context.beginPath();
    canvases[1].context.fillStyle = 'rgba(0,0,0, 0.02)';
    canvases[1].context.strokeStyle = "lightgrey";
    canvases[1].context.arc(this.position._x, this.position._y,this.range, 0, 2 * Math.PI);
    canvases[1].context.fill();
    canvases[1].context.stroke();
    
    canvases[1].context.beginPath();
    canvases[1].context.fillStyle = "red";
    canvases[1].context.strokeStyle = "black";
    canvases[1].context.arc(this.position._x, this.position._y,this.radius, 0, 2 * Math.PI);
    canvases[1].context.fill();
    canvases[1].context.stroke();
  };

}
