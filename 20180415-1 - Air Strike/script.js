// Se não quiser usar p5.js => usar o script.js no HTML
// Neste caso o loop far-se-á através da function newFrame()

setupEventListeners();

canvases.push(new Canvas("Canvas_0"));
canvases.push(new Canvas("Canvas_1"));
canvases.push(new Canvas("Canvas_2"));

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
  canvases[1].context.beginPath();
  canvases[1].context.strokeStyle = color;
  canvases[1].context.moveTo(point_a.position._x, point_a.position._y);
  canvases[1].context.lineTo(point_b.position._x, point_b.position._y);
  canvases[1].context.stroke();
};

let targetSpawnCouter = 1000;

let kills = 0;

function spawnTarget (){
  targets.push(new Target());
}

newFrame();

function newFrame() {

  canvases[2].clear();
  canvases[1].clear();
  canvases[0].clear();

  canvases[1].context.strokeText("Live Cannonballs:         " + cannonballs.length, 10, 50);
  canvases[1].context.strokeText("Live Targets:         " + targets.length, 10, 70);
  canvases[1].context.strokeText("Kills:         " + kills, 10, 100);

/*
  canvases[1].context.strokeText("Base Position:            " + base.position._x+" "+ base.position._y, 10, 70);
  canvases[1].context.strokeText("Holder Position:          " + holder.position._x+" "+ holder.position._y, 10, 90);
  canvases[1].context.strokeText("Holder Hidden Position:   " + holderHidden.position._x+" "+ holderHidden.position._y, 10, 110);
  canvases[1].context.strokeText("Holder Opposite Position: " + holderOpposite.position._x+" "+ holderOpposite.position._y, 10, 130);

  canvases[1].context.strokeText("Holder Opposite Stretch:  " + springStretchOpposite._x+" "+ springStretchOpposite._y, 10, 160);
*/

for (let i = explosions.length - 1; i >= 0; i--) {
  explosions[i].draw();
  if (explosions[i].exploding = false) { explosions.splice(i, 1) };
};

  targetSpawnCouter += utils.randomRange (0,5);
  if (targetSpawnCouter> 400) {
    spawnTarget();
    targetSpawnCouter = 0;
  };

  for (let i = targets.length - 1; i >= 0; i--) {
    targets[i].edge();
    targets[i].move();
    targets[i].draw();
    if (targets[i].withinEdge == false) {
      targets.splice(i, 1)
    }

    for (let j = cannonballs.length -1 ; j >= 0; j--){
      if(targets[i].hit(cannonballs[j]) == true){
        explosions.push(new Explosion(cannonballs[j].position._x,cannonballs[j].position._y));
        targets.splice(i, 1);
        cannonballs.splice(j,1);
        kills +=1;
      }
    }
  }

  for (let i = cannonballs.length - 1; i >= 0; i--) {
    cannonballs[i].edge();
    cannonballs[i].move();
    cannonballs[i].draw();
    if (cannonballs[i].withinEdge == false) {
      cannonballs.splice(i, 1)
    }
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

  if (!slingGrabbed) {
    holder.move()
  };

  springStretch = base.position.subtract(holder.position);
  springStretchHidden = base.position.subtract(holderHidden.position);
  springForce = springStretch.multiply(springTension);
  holder.velocity.addTo(springForce);

  holderOpposite.position = base.position.add(springStretch);
  springStretchOpposite = holderOpposite.position.subtract(base.position);
  springStretchOpposite.multiplyBy(Math.pow(springTension*10,2));
  holderOpposite.position = base.position.add(springStretchOpposite);

  base.draw();
  holder.draw();
//  holderHidden.draw();
//  holderOpposite.draw();



  requestAnimationFrame(newFrame);
};