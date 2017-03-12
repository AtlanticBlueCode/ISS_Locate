

function keyDown(event) {
    GameStartKey = true; // Jogo apenas começa (nava pode ser atingida) após ser tocada a primeira tecla
    console.log(event.keyCode); // truque para logar para a consola o codigo da tecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            Ship_A.thrusting = true;
            break;
        case 37: //left
            Ship_A.turningLeft = true;
            break;
        case 39: //right
            Ship_A.turningRight = true;
            break;
        case 32: //spacebar
            LaserFired = true;
            break;
        case 17: //Right Ctrl
            if (Missiles.length == 0) { MissileFired = true } else { MissileDetonated = true };
            break;
        case 83: //toggle showData
            DataOn ? DataOn=false:DataOn = true;
            break;
        default:
            break;
    }
}


function keyUp(event) {
    switch (event.keyCode) {
        case 38: //up
            Ship_A.thrusting = false;
            break;
        case 37: //left
            Ship_A.turningLeft = false;
            break;
        case 39: //right
            Ship_A.turningRight = false;
            break;
        case 32: //spacebar
            LaserFired = false;
            break;
        case 17: //Right Ctrl
            MissileFired = false;
            MissileDetonated = false;
            break;
        default:
            break;
    }
}