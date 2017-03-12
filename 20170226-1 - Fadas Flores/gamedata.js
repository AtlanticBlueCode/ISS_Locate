
function showData() {                        // Indicar dados sobre a ship

    context.fillStyle = 'rgba(255, 255, 255,0)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 200, 300); //limpar bem zona de dados  

    context.fillStyle = 'black';

    context.fillText("Position X: " + Fairy_A.position.getX().toFixed(2), 0, 10);
    context.fillText("Position Y: " + Fairy_A.position.getY().toFixed(2), 0, 20);

    context.fillText("Speed X: " + Fairy_A.velocity.getX().toFixed(2), 0, 40);
    context.fillText("Speed Y: " + Fairy_A.velocity.getY().toFixed(2), 0, 50);

    context.fillText("Bearing: " + (Fairy_A.bearing.getAngle() / (Math.PI * 2) * 360 + 90).toFixed(2), 0, 70);

    context.fillText("Thrust X: " + Fairy_A.acceleration.getX().toFixed(2), 0, 90);
    context.fillText("Thrust Y: " + Fairy_A.acceleration.getY().toFixed(2), 0, 100);

    context.fillText("Thrusting?: " + Fairy_A.thrusting, 0, 120);

    context.fillText("Turning Left?: " + Fairy_A.turningLeft, 0, 140);
    context.fillText("Turning Right?: " + Fairy_A.turningRight, 0, 150);

    context.fillText("Gravity?: " + Fairy_A.gravity.getY().toFixed(3), 0, 170);

    context.fillText("Live PowerUps?: " + PowerUps.length, 0, 190);

    context.fillText("SCORE: " + Math.floor(Score), 0, 210);

    context.fillText("Start ?: " + GameStart, 0, 230);

};

