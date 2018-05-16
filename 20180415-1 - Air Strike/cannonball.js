
class Cannonball {

  constructor(initialForce, color) {
    this.position = new Vector(holder.position._x,holder.position._y);
    this.velocity = initialForce;
    this.acceleration = new Vector(0, 0);

    this.gravity = new Vector(0, 0.04);

    this.color = color;

    this.radius = 8;

    this.withinEdge = true;
  }

  move() {
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  }

  accelerate() {
    this.velocity.addTo(this.acceleration);
  }

  edge() {
    if (
      this.position._x + this.radius < 0 ||
      this.position._x - this.radius > width ||
      this.position._y - this.radius > height
      //this.position._y < 0 
      ){
      
      this.withinEdge = false;
      } else {
      this.withinEdge = true
      }
  };

  draw() {
    canvases[0].context.beginPath();
    canvases[0].context.fillStyle = this.color;
    canvases[0].context.strokeStyle = "rgba(0,0,0,1)";
    canvases[0].context.arc(this.position._x, this.position._y, this.radius, 0, 2 * Math.PI);
    canvases[0].context.fill();
    canvases[0].context.stroke();
  }
}