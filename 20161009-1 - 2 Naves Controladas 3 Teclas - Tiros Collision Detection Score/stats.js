

// Indicar dados sobre a ship

function statsShip_A() {
    
    context.fillStyle = 'rgba(255,255,255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 200, 250); //limpar bem zona de dados

    context.fillStyle = 'darkblue';
    
    context.fillText("Position X: " + ship_A.position.getX().toFixed(2), 0, 10);
    context.fillText("Position Y: " + ship_A.position.getY().toFixed(2), 0, 20);

    context.fillText("Velocity X: " + ship_A.velocity.getX().toFixed(2), 0, 40);
    context.fillText("Velocity Y: " + ship_A.velocity.getY().toFixed(2), 0, 50);

    context.fillText("Gravity: " + ship_A.gravity.getY().toFixed(2), 0, 70);

    context.fillText("Acceleration X: " + ship_A.acceleration.getX().toFixed(2), 0, 90);
    context.fillText("Acceleration Y: " + ship_A.acceleration.getY().toFixed(2), 0, 100);

    context.fillText("Thrusting?: " + ship_A.thrusting, 0, 120);
    
    context.fillText("Turning Left?: " + ship_A.turningLeft, 0, 140);
    context.fillText("Turning Right?: " + ship_A.turningRight, 0, 150);

    context.fillText("Bearing Angle: " + (ship_A.bearing.getAngle() / (Math.PI * 2) * 360 + 90).toFixed(2), 0, 170);
    context.fillText("Bearing Length: " + ship_A.bearing.getLength().toFixed(2), 0, 180);

    context.fillText("Acceleration Angle: " + (ship_A.acceleration.getAngle() / (Math.PI * 2) * 360 + 90).toFixed(2), 0, 200);
    context.fillText("Acceleration Length: " + ship_A.acceleration.getLength().toFixed(2), 0, 210);

    context.fillText("Shots Fired: " + num_shotsFired_A, 0, 230);
    context.fillText("Live Shots: " + shotsFired_A.length, 0, 240);

};


function statsShip_B() {
    
    context.fillStyle = 'rgba(255,255,255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 400, 200, 250); //limpar bem zona de dados

    context.fillStyle = 'green';
    
    context.fillText("Position X: " + ship_B.position.getX().toFixed(2), 0, 410);
    context.fillText("Position Y: " + ship_B.position.getY().toFixed(2), 0, 420);

    context.fillText("Velocity X: " + ship_B.velocity.getX().toFixed(2), 0, 440);
    context.fillText("Velocity Y: " + ship_B.velocity.getY().toFixed(2), 0, 450);

    context.fillText("Gravity: " + ship_B.gravity.getY().toFixed(2), 0, 470);

    context.fillText("Acceleration X: " + ship_B.acceleration.getX().toFixed(2), 0, 490);
    context.fillText("Acceleration Y: " + ship_B.acceleration.getY().toFixed(2), 0, 500);

    context.fillText("Thrusting?: " + ship_B.thrusting, 0, 520);

    context.fillText("Turning Left?: " + ship_B.turningLeft, 0, 540);
    context.fillText("Turning Right?: " + ship_B.turningRight, 0, 550);

    context.fillText("Bearing Angle: " + (ship_B.bearing.getAngle() / (Math.PI * 2) * 360 + 90).toFixed(2), 0, 570);
    context.fillText("Bearing Length: " + ship_B.bearing.getLength().toFixed(2), 0, 580);

    context.fillText("Acceleration Angle: " + (ship_B.acceleration.getAngle() / (Math.PI * 2) * 360 + 90).toFixed(2), 0, 600);
    context.fillText("Acceleration Length: " + ship_B.acceleration.getLength().toFixed(2), 0, 610);

    context.fillText("Shots Fired: " + num_shotsFired_B, 0, 630);
    context.fillText("Live Shots: " + shotsFired_B.length, 0, 640);

};


function scoreBoard() {

    context.fillStyle = 'rgba(255,255,255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(width - 200, 20, 200, 200); //limpar bem zona de dados

    context.fillStyle = 'black';
    
    context.fillText("Score Azul: " + ship_A_Score, width - 200, 20);
    context.fillText("Score Verde: " + ship_B_Score, width - 200, 30);
};

