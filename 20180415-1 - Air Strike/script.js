// Se não quiser usar p5.js => usar o script.js no HTML
// Neste caso o loop far-se-á através da function newFrame()

if("serviceWorker" in navigator){
  try {
    navigator.serviceWorker.register("service-worker.js");    // servive-worker.js file has to be in the root of the application, next to html file
    console.log("Service Worker Registered!!!");
  }
  catch (error){
    console.log("Service Worker NOT Registered!!!");
  }
}


setupEventListeners();

canvases.push(new Canvas("Canvas_0")); // Landscape
canvases.push(new Canvas("Canvas_1")); // Cannonnballs, Targets
canvases.push(new Canvas("Canvas_2")); // Linha, Scoreboard, Bases, Holder 
canvases.push(new Canvas("Canvas_3")); // Explosions

let utils = new Utils;

let base = new Base;

let holder = new Holder;
let holderHidden = new Holder; // Holder auxiliar para a fisga se mexer bem ao longo do Range
let holderOpposite = new Holder; // Holder auxiliar para a fisga se mexer bem ao longo do Range

let springTension = 0.2;
let springForce = new Vector(0.00001, 0.000001);
let springStretch = new Vector;
let springStretchHidden = new Vector;
let springStretchOpposite = new Vector;
let springStretchMax = new Vector;
springStretchMax.setLength(base.range);

let cannonballs = [];
let targets = [];
let explosions = [];

function slingShot() {
  console.log("Sling!!")
  cannonballs.push(new Cannonball(springForce, nextCannonballColor));
  holder.color = holder.startingColor;
}

function line(point_a, point_b, color) {
  canvases[2].context.beginPath();
  canvases[2].context.strokeStyle = color;
  canvases[2].context.moveTo(point_a.position._x, point_a.position._y);
  canvases[2].context.lineTo(point_b.position._x, point_b.position._y);
  canvases[2].context.stroke();
};

let targetSpawnCouter = 1000;

let kills = 0;

function drawLandscape() {
//  canvases[0].context.beginPath();
  canvases[0].context.drawImage(
    imageLandscape, // Imagem da sprites sheet toda
    0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
    imageLandscape.width, imageLandscape.height, // Largura e Altura da frame a recortar
    0, 0, // Coordenadas do canto sup esquerdo destino no canvas
    width, height // Largura e Altura da frame a desenhar
  );
//  canvases[0].context.restore();
}

function spawnTarget() {
  targets.push(new Target());
}

window.onload = startup();

function startup() {
  console.log("Start");
  newFrame();
};


function newFrame() {

  canvases[0].clear(); // Landscape
  canvases[1].clear(); // Cannonball & Targets
  canvases[2].clear(); // Linha, Scoreboard, Bases, Holder
  canvases[3].clear(); // Explosion

  drawLandscape();

  targetSpawnCouter += utils.randomRange(0, 5);
  if (targetSpawnCouter > 350) {
    spawnTarget();
    targetSpawnCouter = 0;
  };

  canvases[2].context.fillStyle = "black";
  canvases[2].context.fillText("V 20180707-01", 10, 20);
  canvases[2].context.fillText("Live Cannonballs:         " + cannonballs.length, 10, 50);
  canvases[2].context.fillText("Live Targets:         " + targets.length, 10, 70);
  canvases[2].context.fillText("Kills:         " + kills, 10, 100);
  

  for (let i = 0; i < targets.length; i++) {
    targets[i].move();
    targets[i].draw();
    targets[i].edge();
    if (targets[i].withinEdge == false) {targets.splice(i, 1)};
  };

  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].draw();
    if (explosions[i].exploding = false) {explosions.splice(i, 1)};
  };

  for (let i = cannonballs.length - 1; i >= 0; i--) {
    cannonballs[i].move();
    cannonballs[i].draw();
    for (let j = targets.length - 1; j >= 0; j--){
      if (targets[j].hit(cannonballs[i]) == true) {
        targets.splice(j, 1);
        cannonballs[i].alive = false; //**********//
        kills += 1;
        explosions.push(new Explosion(cannonballs[i].position._x, cannonballs[i].position._y));
      }
    }
    cannonballs[i].edge();
    if (cannonballs[i].withinEdge == false || cannonballs[i].alive == false) {
      cannonballs.splice(i, 1)
    };
  }

  holderHidden.position._x = mouseX;
  holderHidden.position._y = mouseY;

  if (slingGrabbed) {
    if (utils.distanceXY(mouseX, mouseY, base.position._x, base.position._y) <= base.range) {
      holder.position._x = mouseX;
      holder.position._y = mouseY;
    } else if (utils.distanceXY(mouseX, mouseY, base.position._x, base.position._y) > base.range) {
      springStretch.setLength(base.range);
      springStretch.setAngle(springStretchHidden.getAngle());
      holder.position = base.position.subtract(springStretch);
    }
    line(base, holder, 'black');
    line(base, holderOpposite, 'lightgrey');
  };

  if (!slingGrabbed) {holder.move()};

  springStretch = base.position.subtract(holder.position);
  springStretchHidden = base.position.subtract(holderHidden.position);
  springForce = springStretch.multiply(springTension);
  holder.velocity.addTo(springForce);

  holderOpposite.position = base.position.add(springStretch);
  springStretchOpposite = holderOpposite.position.subtract(base.position);
  springStretchOpposite.multiplyBy(Math.pow(springTension * 10, 2));
  holderOpposite.position = base.position.add(springStretchOpposite);

  base.draw();
  holder.draw();
  //  holderHidden.draw();
  //  holderOpposite.draw();

  requestAnimationFrame(newFrame);
};