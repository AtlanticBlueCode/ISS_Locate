new p5()

let width = window.innerWidth -20
let height = window.innerHeight -20


function setup(){
  createCanvas(width, height)
  strokeWeight(1);
  angleMode(DEGREES)
  createSliders()
}

// Create Initial Hunters
let hunters = []
let hunterCountInitial = 25
for (let i = 0; i < hunterCountInitial; i++) {hunters.push(new Hunter(i))}
let focusedHunter = 0

// Create Sliders based on Hunter 0
let sliders = []
let slidersList = ["captureRadius", "scanRadius", "scanAperture"]
function createSliders(){
  for (let i = 0; i < slidersList.length; i++){
    sliders.push(new Slider (hunters[0], slidersList[i], 20 + i*30))
  }  
}

// Create Initial Foods
let food = []
let foodCountInitial = 25
for (let i=0; i< foodCountInitial;i++){food.push(new Food())}

// Spawn New Foods
let foodTimer = 0
let foodSpawnInterval = 25
let foodMax = 100
function foodSpawn(){
  if(foodTimer >= foodSpawnInterval && food.length < foodMax) {
    food.push(new Food())
    totalSpawnedFood +=1
    foodTimer = 0
  }
  foodTimer +=1
}

// Food Counters
let totalSpawnedFood = foodCountInitial
let totalCapturedFood = 0
let totalAvailableFood = totalSpawnedFood - totalCapturedFood


// Control UI
let showFocusedHunter = true
let showDebugData = false
let showHunterStats = false
let showCaptures = false
let showHealth = false
let showControlMode = false
let showUI = false
let showFoodStats = false


// Control Mode: Manual or Autopilot
let controlMode = "Autopilot"


function keyTyped(){
  if(key===('h')){showFocusedHunter ? showFocusedHunter = false : showFocusedHunter = true}
  if(key===('d')){showDebugData ? showDebugData = false : showDebugData = true}
  if(key===('s')){
    if(showHunterStats) {
      showHunterStats = false
    } 
    else {
      showHunterStats = true;
      focusedHunter = 0;
    }
  }

  if(key===('c')){showCaptures ? showCaptures = false : showCaptures = true}
  if(key===('x')){showHealth ? showHealth = false : showHealth = true}
  if(key===('m')){showControlMode ? showControlMode = false : showControlMode = true}
  if(key===('u')){showUI ? showUI = false : showUI = true}
  if(key===('f')){showFoodStats ? showFoodStats = false : showFoodStats = true}

  if(key===('a')){controlMode == "Autopilot" ? controlMode = "Manual" : controlMode = "Autopilot"}
}



function draw(){

  fill("PapayaWhip")
  rect(0, 0, width, height)

  foodSpawn()
  totalAvailableFood = totalSpawnedFood - totalCapturedFood

  if(showFocusedHunter) highlightFocusedHunter()
  if(showDebugData) displayDebugData()
  
  if(showHunterStats) displayHunterStats(hunters[focusedHunter])
  
  if(showCaptures) displayCaptures()
  if(showHealth) displayHealth()
  if(showControlMode) displayControlMode()
  if(showUI) displayUI()
  if(showFoodStats) displayWorldStats() 



  for (let g in sliders){
    sliders[g].drawName()
    for (let j in hunters){
      sliders[g].update(hunters[j])
    }
  }

  for (let j in hunters){
    hunters[j].foodDetected = []
    for (let i in food){
      hunters[j].detectedTest(food[i])
    }
    hunters[j].foodDetected.length > 0 ? hunters[j].contact = true : hunters[j].contact = false 
  }

  for (let j in hunters){
    if(controlMode == "Autopilot") {hunters[j].autopilot()}
    if(controlMode == "Manual"){
      hunters[j].keyListen()
      hunters[j].edges()
      hunters[j].autopilotMode = "Manual"
    }
    
    hunters[j].edgeCheck()
    hunters[j].move()
    hunters[j].see()
    hunters[j].draw()
    hunters[j].captureTimer()
    hunters[j].healthChange()
  }


  for (let j in hunters){
    for(let i in food){
      food[i].draw()
      food[i].eatenTest(hunters[j])
      if (food[i].eaten) {food.splice(i,1)}
    }
  }

  for (let j in hunters){
    if(hunters[j].health == 0){
      hunters.splice(j,1)
    }
  }

  if(hunters.length == 0) return

}
