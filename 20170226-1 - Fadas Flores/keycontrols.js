
// funcao "keyDown" executada quando detectado evento "keydown"
function keyDown(event) {
    GameStart = true; // Jogo apenas começa (nava pode ser atingida) após ser tocada a primeira tecla
    console.log(event.keyCode); // truque para logar para a consola o codigo da tecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            Fairy_A.thrusting = true;
            break;
        case 37: //left
            Fairy_A.turningLeft = true;
            break;
        case 39: //right
            Fairy_A.turningRight = true;
            break;
        case 83: //toggle showData
            dataOn ? dataOn=false:dataOn = true;
            break;
        default:
            break;
    }
}


// funcao "keyUp" executada quando detectado evento "keyup"
function keyUp (event) {
    switch (event.keyCode) {
        case 38: //up
            Fairy_A.thrusting = false;
            break;
        case 37: //left
            Fairy_A.turningLeft = false;
            break;
        case 39: //right
            Fairy_A.turningRight = false;
            break;
        default:
            break;
    }
}
