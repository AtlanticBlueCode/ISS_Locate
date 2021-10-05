class Hunter{

  constructor(id){
    
    this.id = id

    this.health = 100
    this.healthMax = 100
    this.healthMin = 0
    this.healthDecay = 0.1
    this.healthEat = 25

    this.coreColorMin = [0  ,  0  ,  0  , 255]   // Preto com Health no Min
    this.coreColorMax = [50 ,  255,   50, 255]   // Verde com Health no Max
    this.coreColorBase = this.coreColorMin
    this.coreColor = color (
        this.coreColorBase[0],
        this.coreColorBase[1],
        this.coreColorBase[2],
        this.coreColorBase[3],
        )

    this.contact = false
    this.edge = false

    this.radius = 4

    this.velocityLine = 15
    this.velocityLineColor = color(255,0,0,255)
    
    this.captureCount = 0

    this.captureRadius = 8

    this.captureColorIntensityMax = 100
    this.captureColorIntensityMin = 0
    this.captureColorIntensityChange = 2.5
    this.captureColorIntensity = 100

    this.captureColorMin = [0  , 255, 75, 225]
    this.captureColorMax = [255,  50,  50, 175]
    this.captureColorBase = this.captureColorMin
    this.captureColor = color (
        this.captureColorBase[0],
        this.captureColorBase[1],
        this.captureColorBase[2],
        this.captureColorBase[3],
        )
    
    this.captureClockMax = 500
    this.captureClockMin = 0
    this.captureClock = 0

    this.scanRadius = 150
    this.scanAperture = 30
    this.scanColorBase    = color (125,  50,  50, 75 )
    this.scanColorContact = color ( 50, 200,  50, 150)
    this.scanColor        = this.scanColorBase
    
    this.foodDetected = []

    this.position = createVector(random(width*1/4, width*3/4), random(height*1/4, height*3/4))
  
    this.velocity = createVector(1, 1)
    this.velocity.setHeading(random(360))
    this.velocityMax = 5
    
    this.desired = createVector(0,0)
    this.steer = createVector(0,0)
    
    this.acceleration = createVector(0,0)
    this.maxAcceleration = 0.5

    this.drag = createVector(0.99,0.99)

    this.xoff = 0.0;
    this.yoff = 1.0;
    this.zoff = 2.0;

    this.autopilotMode = ""

    this.continueRandom = false

  }
  
  keyListen(){
    if(keyIsDown(UP_ARROW)){this.velocity.setMag(this.velocity.mag()+0.2)}
    if(keyIsDown(DOWN_ARROW)){this.velocity.setMag(this.velocity.mag()*0.96)}
    if(keyIsDown(LEFT_ARROW)){this.velocity.rotate(-3)}
    if(keyIsDown(RIGHT_ARROW)){this.velocity.rotate(+3)}
  }


  edgeCheck(){
    // Check if on Edge
    if(this.position.x >= 25 && this.position.x <= width - 25 && this.position.y >= 25 && this.position.y <= height -25){
      this.edge = false
    } else {
      this.edge = true
    }
  }

  autopilot(){

    // First - Contact Mode
    if(this.contact == true){
      this.autopilotMode = "Seek"
      this.seek()
      this.continueRandom = false
    }
    
    // Second - Edge Mode
    else if(this.edge == true){
      this.autopilotMode = "Edges"
      this.edges()
      this.continueRandom = false
    }

    // Third - Random Mode
    else {
      this.autopilotMode = "Random"
      this.random()
      this.continueRandom = true
    }
  }

  random(){

  // Random Noise Vector - Organic Random Walker

    if(this.continueRandom == false){ // Para começar um novo Perlin Noise, apenas quando não estava em Random e passa a esatar
      this.xoff = random(1000);
      this.yoff = random(1000);
      this.zoff = random(1000);
    }

    this.xoff += 0.0075;
    this.yoff += 0.0075;
    this.zoff += 0.025;

    
    let randomNoiseVector = createVector(
      this.velocity.x + (noise(this.xoff)*2-1), 
      this.velocity.y + (noise(this.yoff)*2-1)
    )
    
    // let randomNoiseVector = createVector(random(-3,3), random(-3,3))

    randomNoiseVector.normalize()
    randomNoiseVector.mult(this.velocityMax * (noise(this.zoff)/2 +0.5))


  // Random Centre Vector - Desire Towards Centre of Screen the Farthest Away it is from Centre
  
    let centre = createVector (width/2, height/2)
    let distanceFromCentre = this.position.dist(centre)
    let corner = createVector (0, 0)
    let maxDistanceFromCentre = corner.dist(centre)

    let randomCentreVector = p5.Vector.sub(centre,this.position)
    randomCentreVector.normalize()

    let desiredCentreVelocity = map (distanceFromCentre, maxDistanceFromCentre, 0, this.velocityMax, 0)

    randomCentreVector.mult(desiredCentreVelocity)


  // Random Combined Vector - Weighted Average Random Vector

    randomNoiseVector.mult(9)
    randomCentreVector.mult(1)

    let sumRandomDesire = createVector()
    sumRandomDesire.add(randomNoiseVector)
    sumRandomDesire.add(randomCentreVector)
    sumRandomDesire.div(10)

    this.desired = sumRandomDesire
    
    this.applyForce()
  }

  seek(){
    let nearestFood
    let nearestFoodDistance = 10000

    for(let i in this.foodDetected){
      if(
        this.position.dist(this.foodDetected[i].position) <= nearestFoodDistance) {
          nearestFood = this.foodDetected[i]
          nearestFoodDistance = this.position.dist(nearestFood.position)
        }
    }
    
    this.desired = p5.Vector.sub(nearestFood.position,this.position)
    
    if(nearestFoodDistance < 100){ //slowdown when arriving
      let desiredArrivingVelocity = map(nearestFoodDistance, 0, 100, this.velocityMax/4, this.velocityMax)   
      this.desired.mult(desiredArrivingVelocity)
    } 
    else { //accelerate when departing
      let desiredDepartingVelocity = map(this.captureClock, 500, 300, this.velocityMax/4, this.velocityMax)   
      this.desired.mult(desiredDepartingVelocity)
    }

    this.applyForce()
  }

  edges(){
    if(this.edge){
      if(this.position.x < 25)          {this.desired = createVector (this.velocityMax, this.velocity.y)}
      if(this.position.x > width - 25)  {this.desired = createVector (-this.velocityMax, this.velocity.y)}
      if(this.position.y < 25)          {this.desired = createVector (this.velocity.x, this.velocityMax)}
      if(this.position.y > height - 25) {this.desired = createVector (this.velocity.x, -this.velocityMax)}

      this.desired.mult(this.velocityMax)
      this.applyForce()
    }
  }

  applyForce(){
    this.steer = p5.Vector.sub(this.desired, this.velocity)
    this.steer.limit(this.maxAcceleration)
    this.acceleration.add(this.steer)
  }
  
  draw(){

    // Edges
    if(this.edge) {
      stroke(0, 0, 0, 50)
      noFill()
      rect(25,25,width-50, height-50)
    }

    // Scanner
    stroke(0)
    fill(this.scanColor)
    arc(this.position.x, this.position.y, this.scanRadius, this.scanRadius, this.velocity.heading() - this.scanAperture, this.velocity.heading() + this.scanAperture, PIE)


    // Food Capture Range
    stroke(0)
    fill(this.captureColor)
    ellipse(this.position.x, this.position.y, this.captureRadius * 2)

    // Hunter Core
    stroke(0)
    fill(this.coreColor)
    ellipse(this.position.x, this.position.y, this.radius *2)

    // Hunter Heading and Velocity
    stroke(this.velocityLineColor)
    noFill()
    line(this.position.x, this.position.y,this.position.x + this.velocity.x*this.velocityLine, this.position.y + this.velocity.y*this.velocityLine)    
}

  move(){
    this.velocity.add(this.acceleration)
//    this.velocity.mult(this.drag)
    this.velocity.limit(this.velocityMax)
  
    this.position.add(this.velocity)
  
    this.acceleration.mult(0)
  }

  see(){
    this.contact ? this.scanColor = this.scanColorContact : this.scanColor = this.scanColorBase
  }

  detectedTest(e){
    let a = map(atan2(e.position.y - this.position.y, e.position.x - this.position.x), -180, 180, 0, 360)
    let b = map(this.velocity.heading(), -180, 180, 0, 360)

    if(this.position.x > e.position.x){ // para resolver o bug de quando o hunter está à direita do target existir um blind spot pq há volta ao 360 num e no outro não
      a+=180
      b+=180
    }

    if(e.position.dist(this.position) < this.scanRadius / 2 && 
        a % 360 < (b + this.scanAperture) % 360 &&
        a % 360 > (b - this.scanAperture) % 360){
    this.foodDetected.push(e)
    }
  }


  eat(){
    this.captureClock = this.captureClockMax
    this.captureCount +=1

    this.health += Math.min (           // Cap no Health Max
      this.healthEat,
      this.healthMax - this.health
      )

    totalCapturedFood +=1
  }

  healthChange(){
    this.health -= Math.min (            // Floor no Health Min
      this.healthDecay,
      this.health - this.healthMin
    )

    this.coreColor = color (
      map(this.health, this.healthMin, this.healthMax, this.coreColorMin[0], this.coreColorMax[0]),
      map(this.health, this.healthMin, this.healthMax, this.coreColorMin[1], this.coreColorMax[1]),
      map(this.health, this.healthMin, this.healthMax, this.coreColorMin[2], this.coreColorMax[2]),
      map(this.health, this.healthMin, this.healthMax, this.coreColorMin[3], this.coreColorMax[3]),
    )
  }

  captureTimer(){
    this.captureClock > 0 ? this.captureClock -= this.captureColorIntensityChange : this.captureClock += 0
    let a = map(this.captureClock, this.captureClockMax, this.captureClockMin, this.captureColorIntensityMax,this.captureColorIntensityMin)
    this.captureColorIntensity = a
    this.captureColor = color (
      map(this.captureColorIntensity, this.captureColorIntensityMin, this.captureColorIntensityMax, this.captureColorMax[0], this.captureColorMin[0]),
      map(this.captureColorIntensity, this.captureColorIntensityMin, this.captureColorIntensityMax, this.captureColorMax[1], this.captureColorMin[1]),
      map(this.captureColorIntensity, this.captureColorIntensityMin, this.captureColorIntensityMax, this.captureColorMax[2], this.captureColorMin[2]),
      map(this.captureColorIntensity, this.captureColorIntensityMin, this.captureColorIntensityMax, this.captureColorMax[3], this.captureColorMin[3]),
    )
  }
  
  displayHeading(){
    textFont("courier");
    textStyle(BOLD)
    fill(this.coreColorBase)
    strokeWeight(0.5)
    stroke(50)

    let a = round(map(this.velocity.heading(), -180, 180, 0, 360),0)
    text(a, this.position.x + this.velocity.x + 35, this.position.y + this.velocity.y)
  }

  displayCaptureCount(){
    textFont("courier");
    textStyle(BOLD)
    fill(this.coreColorBase)
    strokeWeight(0.5)
    stroke(50)
    text(this.captureCount, this.position.x + this.velocity.x + 25, this.position.y +this.velocity.y + 35)
  }

  displayHealthCount(){
    textFont("courier");
    textStyle(BOLD)
    fill(this.coreColorBase)
    strokeWeight(0.5)
    stroke(50)
    text(Math.round(this.health,0), this.position.x + this.velocity.x - 35, this.position.y + this.velocity.y + 35)
  }
}
