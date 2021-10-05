  
function displayUI(){
  textFont("courier")
  textSize(10)
  textStyle(BOLD)
  fill(0)
  strokeWeight(0.5)
  stroke(50)

  text("Toggle Autopilot/Manual Mode => Press A", 20, height - 210)

  text("Show Focused Hunter          => Press H", 20, height - 150)
  text("Show Debug Aid               => Press D", 20, height - 130)
  text("Show Selected Hunter Stats   => Press S", 20, height - 110)
  text("Show Capture Count           => Press C", 20, height - 90)
  text("Show Control Mode            => Press M", 20, height - 70)
  text("Show User Interface          => Press U", 20, height - 50)
  text("Show Food Stats              => Press F", 20, height - 30)
}

function displayDebugData(){
  for(let j in hunters){  
    hunters[j].displayHeading()
  }

  for(i in food){
    food[i].displayDegreesTo(hunters[focusedHunter])
    food[i].displayDistanceTo(hunters[focusedHunter])
  }
}

function displayCaptures(){
  for(let j in hunters){  
    hunters[j].displayCaptureCount()
  }
}

function displayHealth(){
  for(let j in hunters){  
    hunters[j].displayHealthCount()
  }
}

function displayWorldStats(){
  textFont("courier");
  textStyle(BOLD)
  fill(0)
  strokeWeight(0.5)
  stroke(50)

  text("Food Spawned:       " + round(totalSpawnedFood, 2), width - 190, height - 70)
  text("Food Captured:      " + round(totalCapturedFood, 2), width - 190, height - 50)
  text("Food Left:          " + round(totalAvailableFood, 2), width - 190, height - 30)
}

function displayHunterStats(hunter){

  if(hunters.length==0){return}
  if(focusedHunter===""){return}

  textFont("courier");
  textStyle(BOLD)
  fill(0)
  strokeWeight(0.5)
  stroke(50)

  text("Select Hunter:  " + round(focusedHunter, 2), 20, 30 + 5)

  text("Hunter:         " + round(focusedHunter, 2), 20, 30 + 30)

  text("Position X:     " + round(hunter.position.x, 2), 20, 90)
  text("Position Y:     " + round(hunter.position.y, 2), 20, 110) 

  text("Velocity X:     " + round(hunter.velocity.x, 2), 20, 140)
  text("Velocity Y:     " + round(hunter.velocity.y, 2), 20, 160) 

  text("Acceleration X: " + round(hunter.acceleration.x, 2), 20, 190)
  text("Acceleration Y: " + round(hunter.acceleration.y, 2), 20, 210)

  text("Capture Clock:  " + round(hunter.captureClock, 0), 20, 240)
  text("Capture Count:  " + round(hunter.captureCount, 0), 20, 260)

  text("Health:         " + round(hunter.health, 0), 20, 290)

}

function displayPopulationStats(){
  hh
}

function displayControlMode(){
  if(hunters.length==0){return}

  textFont("courier");
  textStyle(BOLD)
  fill(0)
  strokeWeight(0.5)
  stroke(50)

  text("Control Mode: " + controlMode, 20, 500)
  text("Autopilot Mode: " + hunters[0].autopilotMode, 20, 520)
}


function highlightFocusedHunter(){
  if(hunters.length==0){return}
  if(focusedHunter===""){return}

  noFill()
  stroke("red")
  strokeWeight(2)
  ellipse(
    hunters[focusedHunter].position.x + hunters[focusedHunter].velocity.x, 
    hunters[focusedHunter].position.y + hunters[focusedHunter].velocity.y, 
    hunters[focusedHunter].captureRadius * 2 * 2)

}