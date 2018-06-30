function setupEventListeners() {
  mouseEventListeners();
  touchEventListeners();
  //  keyEventListeners();
  //  resizeEventListeners();
};


function sayTime() {
  let x = new Date();
  return x.toLocaleTimeString() + "," + ("00" + x.getMilliseconds()).slice(-3);
};

///////////////////////////
// Resize Event Listeners //
///////////////////////////

function resizeEventListeners() {
  window.addEventListener("resize", windowResize);
};

function windowResize(event) {
  console.log("Resized window!");
};


///////////////////////////
// Mouse Event Listeners //
///////////////////////////

function mouseEventListeners() {
  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("mousedown", mouseDown);
  window.addEventListener("mouseup", mouseUp);
};


let mouseX;
let mouseY;

let slingGrabbed = false;
let mouseClicked = false;

let nextCannonballColor;


function mouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  //  console.log("Mouse Move  => " + "X: "+ mouseX + " " + "Y: "+ mouseY + " "+"Time: " + sayTime());

  //  console.log(holder.position);
  //  console.log(mouse.position);
};

function mouseDown(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  mouseClicked = true;
  if (utils.distanceXY(mouseX, mouseY, base.position._x,base.position._y) <= base.radius) {
    slingGrabbed = true;
    nextCannonballColor = "black" //utils.getRandomColorHEX();
    holder.color = nextCannonballColor;
    console.log("Grabbed Sling!");
  };

  //  console.log("Mouse Down  => " + "X: " + mouseX + " " + "Y: " + mouseY + " " + "Time: " + sayTime());

};

function mouseUp(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  mouseClicked = false;

  // Essencial porque se não o Holder parte com toda a força acumulada durante o puxar da mola até à largada
  // Importante estar aqui para ter efeito sempre que se larga Mouse
  // Mesmo que não seja dentro do Range
  holder.velocity.setLength(0.000001);

  if (slingGrabbed) {
    slingShot();
    slingGrabbed = false;
    console.log("Released Sling")
  };

//  console.log("Mouse Up    => " + "X: " + mouseX + " " + "Y: " + mouseY + " " + "Time: " + sayTime());

};



///////////////////////////
// Touch Event Listeners //
///////////////////////////

let
  touchStartDate = 0,
  touchEndDate = 0,
  touchDuration = 0,
  touchStartX = null,
  touchStartY = null,
  touchX = null,
  touchY = null,
  touchEndX = null,
  touchEndY = null;

function touchEventListeners() {
  window.addEventListener("touchstart", touchStart, false);
  window.addEventListener("touchmove", touchMove, false);
  window.addEventListener("touchend", touchEnd, false);
};

function touchStart(event) {
  //  event.preventDefault();

  mouseX = touchStartX = touchX = Math.round(event.changedTouches[0].clientX);
  mouseY = touchStartY = touchY = Math.round(event.changedTouches[0].clientY);

  mouseClicked = true;
  if (utils.distanceXY(mouseX, mouseY, base.position._x,base.position._y) <= base.radius) {
    slingGrabbed = true;
    nextCannonballColor = "black" //utils.getRandomColorHEX();
    holder.color = nextCannonballColor;
    console.log("Grabbed Sling!");
  };

  touchStartDate = new Date();

  console.log("Touch Start => " + "X: " + touchStartX + " " + "Y: " + touchStartY + " " + "Time: " + sayTime());
};

function touchMove(event) {
  //  event.preventDefault();

  mouseX = touchX = Math.round(event.changedTouches[0].clientX);
  mouseY = touchY = Math.round(event.changedTouches[0].clientY);

  console.log("Touch       => " + "X: " + touchX + " " + "Y: " + touchY + " " + "Time: " + sayTime());
};

function touchEnd(event) {
  //  event.preventDefault();

  mouseX = touchEndX = Math.round(event.changedTouches[0].clientX);
  mouseY = touchEndY = Math.round(event.changedTouches[0].clientY);

  mouseClicked = false;

  // Essencial porque se não o Holder parte com toda a força acumulada durante o puxar da mola até à largada
  // Importante estar aqui para ter efeito sempre que se larga Mouse
  // Mesmo que não seja dentro do Range
  holder.velocity.setLength(0.000001);

  if (slingGrabbed) {
    slingShot();
    slingGrabbed = false;
    console.log("Released Sling")
  };

  touchEndDate = new Date();
  touchDuration = touchEndDate - touchStartDate;

  console.log("Touch End   => " + "X: " + touchEndX + " " + "Y: " + touchEndY + " " + "Time: " + sayTime());
  console.log("Touch Duration: " + touchDuration);
};



/////////////////////////
// Key Event Listeners //
/////////////////////////

function keyEventListeners() {
  window.addEventListener("keydown", keyDown, false);
  window.addEventListener("keyup", keyUp, false);
};

function keyDown(event) {
  let key = event.keyCode;
  console.log("Key Down     => " + key + " " + "Time: " + sayTime());
};

function keyUp(event) {
  let key = event.keyCode;
  console.log("Key Up       => " + key + " " + "Time: " + sayTime());
};