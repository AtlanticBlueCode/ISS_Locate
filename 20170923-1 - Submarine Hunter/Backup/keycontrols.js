

function keyDown(event) {
    console.log(event.keyCode); // truque para logar para a consola o codigo da tecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            Car_A.thrusting = true;
            break;
        case 40: //down
            Car_A.reversing = true;
            break;
        case 37: //left
            Car_A.turningLeft = true;
            break;
        case 39: //right
            Car_A.turningRight = true;
            break;
        case 32: //spacebar
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
            Car_A.thrusting = false;
            break;
        case 40: //down
            Car_A.reversing = false;
            break;
        case 37: //left
            Car_A.turningLeft = false;
            break;
        case 39: //right
            Car_A.turningRight = false;
            break;
        case 32: //spacebar
            break;
        default:
            break;
    }
}