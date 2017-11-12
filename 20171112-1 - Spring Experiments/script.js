
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    heigth = canvas.height = window.innerHeight;

let base = new Particle (width/2, heigth/2,0,0,0)
let peso = new Particle (width/2-100, heigth/2,0,0,0)

peso.friction = 0.9;

let k = 0.1;

let touchStartDate = 0;
let touchEndDate = 0;
let touchDuration = 0;
let touchStartX = null;
let touchStartY = null;
let touchX = null;
let touchY = null;
let touchEndX = null;
let touchEndY = null;
let touchVector = new Vector(null, null);
let touchEndSequence = false;

let thisTime = new Date().getTime();

let distance = new Vector(null,null);
let forca = new Vector(null,null);


loop(); //necessario chamar a funcao pela primeira vez, fora da propria funcao


function loop() {

    clearScreen();
    showData();

    base.draw();

    context.beginPath();
    context.moveTo(peso.position.getX(), peso.position.getY());
    context.lineTo(base.position.getX(), base.position.getY());
    context.stroke();
    context.closePath();
    
    peso.update();
    peso.draw();

    thisTime = new Date().getTime();

    distance = base.position.subtract(peso.position);
    forca = distance.multiply(k);
    peso.velocity.addTo(forca);
//    peso.velocity.addTo(touchVector);


    if (touchEndDate > touchStartDate && touchEndSequence ==true) {  // acaba de ser finalizado um toque ou seja há lançamento
        peso.position._x = touchX;
        peso.velocity._x = touchVector._x;
        peso.acceleration._x = 0;
        peso.position._y = touchY;
        peso.velocity._y = touchVector._y;
        peso.acceleration._y = 0;
        touchEndSequence = false;

    };

    if (touchEndDate < touchStartDate) {    // touch em curso porque fim anterior é previo ao inicio deste
        peso.position._x = touchX;
        peso.velocity._x = 0;
        peso.acceleration._x = 0;
        peso.position._y = touchY;
        peso.velocity._y = 0;
        peso.acceleration._y = 0;
    };


    requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
};


document.body.addEventListener("touchstart", touchStart,false);
document.body.addEventListener("touchmove", touchMove,false);
document.body.addEventListener("touchend", touchEnd,false);

function touchStart(e) {
//  e.preventDefault();
  touchStartDate = new Date().getTime();
  touchStartX = touchX = e.changedTouches[0].clientX;
  touchStartY = touchY = e.changedTouches[0].clientY;
  console.log("touchStartDate: " + touchStartDate);
};

function touchMove(e) {
//  e.preventDefault();
  touchX = e.changedTouches[0].clientX;
  touchY = e.changedTouches[0].clientY;
};

function touchEnd(e) {
//  e.preventDefault();
  touchEndDate = new Date().getTime(); 
  touchDuration = touchEndDate - touchStartDate; 
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;
  touchVector.setX(touchEndX - touchStartX);
  touchVector.setY(touchEndY - touchStartY);
  touchEndSequence = true;  
  console.log(touchVector);
  console.log("touchEndDate: " + touchEndDate);
  console.log("touchDuration: " + touchDuration);

};




// criar event listener para tecla down
// em funcao da tecla carregada ira alterar o vector thrust
// up dá length thrust
// esq e dir altera angle do thrust
document.body.addEventListener("keydown", function (event) {
    console.log(event.keyCode); // truque para logar para a consola o codigo da trecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            base.thrusting = true;
            break;
        case 37: //left
            base.turningLeft = true;
            break;
        case 39: //right
            base.turningRight = true;
            break;
        default:
            break;
    }
});

// criar event listener para tecla up
// define o que acontece ao thrust se tecla deixar de ser carregada
// sem este passo o thrust continuaria para sempre com valor que tinha quando deixei de carregar na tecla 
document.body.addEventListener("keyup", function (event) {
    //    console.log(event.keyCode); // truque para logar para a consola o codigo da trecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            base.thrusting = false;
            break;
        case 37: //left
            base.turningLeft = false;
            break;
        case 39: //right
            base.turningRight = false;
            break;
        default:
            break;
    }
});





function showData () {                        // Indicar dados sobre a base
    context.fillStyle = 'black';
     
    context.fillText("Position X: " + base.position.getX().toFixed(2), 0, 10);
    context.fillText("Position Y: " + base.position.getY().toFixed(2), 0, 20);

    context.fillText("Speed X: " + base.velocity.getX().toFixed(2), 0, 40);
    context.fillText("Speed Y: " + base.velocity.getY().toFixed(2), 0, 50);

    context.fillText("Gravity: " + base.gravity.getY().toFixed(2), 0, 70);

    context.fillText("Thrust X: " + base.acceleration.getX().toFixed(2), 0, 90);
    context.fillText("Thrust Y: " + base.acceleration.getY().toFixed(2), 0, 100);

    context.fillText("Thrusting?: " + base.thrusting, 0, 120);

    context.fillText("Turning Left?: " + base.turningLeft, 0, 140);
    context.fillText("Turning Right?: " + base.turningRight, 0, 150);

    context.fillText("Bearing: " + (base.bearing.getAngle() / (Math.PI * 2) * 360 +90).toFixed(2), 0, 170);
};


function clearScreen () {                         // Limpeza de ecra para rendering    
    context.fillStyle = 'rgba(255, 255, 255, .35)'; // para criar efeito fade pinto todo o canvas deixando um opacity 0.15
    context.fillRect(0, 0, canvas.width, canvas.height); //limpar o canvas todo no inicio da nova frame

    context.fillStyle = 'rgba(255, 255, 255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 100, 200); //limpar bem zona de dados  
};
