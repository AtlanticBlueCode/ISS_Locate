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
        case 38: //up
            thrusting = true;
            break;
        case 37: //left
            turningLeft = true;
            break;
        case 39: //right
            turningRight = true;
            break;
        default:
            break;
    }
});

// criar event listener para tecla up
// define o que acontece ao thrust se tecla deixar de ser carregada
// sem este passo o thrust continuaria para sempre com valor que tinha quando deixei de carregar na tecla 
document.body.addEventListener("keyup", function (event) {
    console.log(event.keyCode); // truque para logar para a consola o codigo da trecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            thrusting = false;
            break;
        case 37: //left
            turningLeft = false;
            break;
        case 39: //right
            turningRight = false;
            break;
        default:
            break;
    }
});
