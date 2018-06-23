
class Holder {
  constructor (){
    this.position = new Vector(base.position._x,base.position._y);
    this.velocity = new Vector(0.00001,0.00001);

    this.friction = 0.9;

    this.radius = base.radius;

    this.startingColor = "black";
    this.color = this.startingColor;

  };

  draw(){
    canvases[2].context.beginPath();
    canvases[2].context.fillStyle = this.color;
    canvases[2].context.strokeStyle = "black";
    canvases[2].context.arc(this.position._x, this.position._y,this.radius, 0, 2 * Math.PI);
    canvases[2].context.fill();
    canvases[2].context.stroke();
  };

  move() {
    this.velocity.multiplyBy(this.friction);
    this.position.addTo(this.velocity);
  }
}