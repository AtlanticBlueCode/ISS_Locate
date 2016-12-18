
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;


// criar event listener para tecla down
// em funcao da tecla carregada ira alterar o vector thrust
// up dá length thrust
// esq e dir altera angle do thrust
document.body.addEventListener("keydown", function (event) {
    console.log(event.keyCode); // truque para logar para a consola o codigo da trecla que se carrega
    switch (event.keyCode) {
        //keydowns Ship_A
        case 38: //up
            ship_A.thrusting = true;
            break;
        case 37: //left
            ship_A.turningLeft = true;
            break;
        case 39: //right
            ship_A.turningRight = true;
            break;
        case 189: //dash
            shotFired_A = true;
            break;

        //keydowns Ship_B
        case 87: //up
            ship_B.thrusting = true;
            break;
        case 65: //left
            ship_B.turningLeft = true;
            break;
        case 68: //right
            ship_B.turningRight = true;
            break;
        case 20: //caps lock
            shotFired_B = true;
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

        //keyups Ship_A
        case 38: //up
            ship_A.thrusting = false;
            break;
        case 37: //left
            ship_A.turningLeft = false;
            break;
        case 39: //right
            ship_A.turningRight = false;
            break;
        case 189: //dash
            shotFired_A = false;
            break;

        //keyups Ship_B
        case 87: //up
            ship_B.thrusting = false;
            break;
        case 65: //left
            ship_B.turningLeft = false;
            break;
        case 68: //right
            ship_B.turningRight = false;
            break;
        case 20: //caps lock
            shotFired_B = false;
            break;

        default:
            break;
    }
});



initialize();

function initialize() {     //essencial definir aqui as variaveis como Globais

    ship_A = particle.create(Math.random()*((width-50)/2)+50, Math.random()*height, 0, Math.random()*(Math.PI * 2), 0), //criar particula nave no centro, parada e sem gravidade
    ship_B = particle.create(Math.random()*((width-50)/2)+(width-50)/2-50,Math.random()*height, 0,  Math.random()*(Math.PI * 2), 0); //criar particula nave no centro, parada e sem gravidade

    shotsFired_A = [], // array de tiros limpa
        num_shotsFired_A = 0;

    shotsFired_B = [], // array de tiros limpa
        num_shotsFired_B = 0;

    shotFired_A = false,
        shotFired_B = false;

    ship_A_Hit = false,
        ship_B_Hit = false;

    sprite.countFrame = 0;      //voltar para o inicio da sprite sheet da explosao

    maxLiveShots = 5;
    
};

var ship_A_Score = 0,
    ship_B_Score = 0;



