
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    heigth = canvas.height = window.innerHeight;


var ships = function () {
    this.members = [];
    this.add = function () {
        var newShip = new particle(width -50, heigth -50, 0, Math.PI * 1.5, 0); //criar particula nave no centro, parada e sem gravidade
        this.members.push(newShip);
    };
};

var ships = new ships();
ships.add();                                 //criar particula nave no centro, parada e sem gravidade

var ship = ships.members[0];

var clearScreen = function () {                         // Limpeza de ecra para rendering    
    context.fillStyle = 'rgba(255, 255, 255, .35)'; // para criar efeito fade pinto todo o canvas deixando um opacity 0.15
    context.fillRect(0, 0, canvas.width, canvas.height); //limpar o canvas todo no inicio da nova frame

    context.fillStyle = 'rgba(255, 255, 255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 200, 190); //limpar bem zona de dados  
};

var showData = function () {                        // Indicar dados sobre a ship
    context.fillStyle = 'black';
     
    context.fillText("Position X: " + ship.position.getX().toFixed(2), 0, 10);
    context.fillText("Position Y: " + ship.position.getY().toFixed(2), 0, 20);

    context.fillText("Speed X: " + ship.velocity.getX().toFixed(2), 0, 40);
    context.fillText("Speed Y: " + ship.velocity.getY().toFixed(2), 0, 50);

    context.fillText("Gravity: " + ship.gravity.getY().toFixed(2), 0, 70);

    context.fillText("Thrust X: " + ship.acceleration.getX().toFixed(2), 0, 90);
    context.fillText("Thrust Y: " + ship.acceleration.getY().toFixed(2), 0, 100);

    context.fillText("Thrusting?: " + ship.thrusting, 0, 120);

    context.fillText("Turning Left?: " + ship.turningLeft, 0, 140);
    context.fillText("Turning Right?: " + ship.turningRight, 0, 150);

    context.fillText("Bearing: " + (ship.bearing.getAngle() / (Math.PI * 2) * 360 +90).toFixed(2), 0, 170);
};

loop(); //necessario chamar a funcao pela primeira vez, fora da propria funcao


function loop() {

    clearScreen();
    showData();

    ship.accelerate();
    ship.update(); //actualizar vector de posicao e movimento
    ship.edge();
    ship.draw();

    requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
};






// criar event listener para tecla down
// em funcao da tecla carregada ira alterar o vector thrust
// up dá length thrust
// esq e dir altera angle do thrust
document.body.addEventListener("keydown", function (event) {
    console.log(event.keyCode); // truque para logar para a consola o codigo da trecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            ship.thrusting = true;
            break;
        case 37: //left
            ship.turningLeft = true;
            break;
        case 39: //right
            ship.turningRight = true;
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
            ship.thrusting = false;
            break;
        case 37: //left
            ship.turningLeft = false;
            break;
        case 39: //right
            ship.turningRight = false;
            break;
        default:
            break;
    }
});

