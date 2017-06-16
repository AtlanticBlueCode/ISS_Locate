
function showData() {                        // Indicar dados sobre a Car

    context.fillStyle = 'rgba(0, 0, 0,0)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 200, 300); //limpar bem zona de dados  

    context.fillStyle = 'navy';

    context.fillText("Position X: " + Car_A.position.getX().toFixed(2), 0, 10);
    context.fillText("Position Y: " + Car_A.position.getY().toFixed(2), 0, 20);

    context.fillText("Speed X: " + Car_A.velocity.getX().toFixed(2), 0, 40);
    context.fillText("Speed Y: " + Car_A.velocity.getY().toFixed(2), 0, 50);

    context.fillText("Thrust X: " + Car_A.acceleration.getX().toFixed(2), 0, 70);
    context.fillText("Thrust Y: " + Car_A.acceleration.getY().toFixed(2), 0, 80);
    
    context.fillText("Bearing: " + (Car_A.bearing.getAngle() / (Math.PI * 2) * 360 + 90).toFixed(2), 0, 100);
    context.fillText("Direction: " + (Car_A.velocity.getAngle() / (Math.PI * 2) * 360 + 90).toFixed(2), 0, 110);

    context.fillText("Thrusting?: " + Car_A.thrusting, 0, 140);
    context.fillText("Reversing?: " + Car_A.reversing, 0, 150);

    context.fillText("Turning Left?: " + Car_A.turningLeft, 0, 170);
    context.fillText("Turning Right?: " + Car_A.turningRight, 0, 180);

//    context.fillText("SCORE: " + Math.floor(Score), 0, 280);

//    context.fillText("Start ?: " + GameStartKey, 0, 300);

};

