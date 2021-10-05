class Food{

  constructor(){
    this.color = "blue"
    this.radius = 2 
    this.position = createVector(random (width*1/10, width*9/10), random(height*1/10, height*9/10))
    this.eaten = false
  }

  draw(){
    fill(this.color)
    stroke(0)
    ellipse(this.position.x, this.position.y, this.radius * 2)
  }

  eatenTest(e){
    if(this.position.dist(e.position) <= e.captureRadius){
        this.eaten = true
        e.eat()
    }
  }

  displayDegreesTo(e){
    textFont("courier");
    fill(this.color)
    stroke(0)
    let a = round(map(atan2(this.position.y - e.position.y, this.position.x - e.position.x),-180, 180, 0, 360),0)  // De notar que atan2 (dY, dX)  ou seja, primeiro delta Y e depois delta X
    text(a, this.position.x + 10, this.position.y + 10)
  }

  displayDistanceTo(e){
    textFont("courier");
    fill(this.color)
    stroke(0)
    let a = round(this.position.dist(e.position),0)
    text(a, this.position.x + 10, this.position.y - 10)
  }

}
