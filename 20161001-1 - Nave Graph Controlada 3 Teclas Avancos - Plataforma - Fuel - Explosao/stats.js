
// Dados sobre a Ship

function statsShip() {

    context.fillStyle = 'rgba(255,255,255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 200, 250); //limpar bem zona de dados

    context.fillStyle = 'black';
    
    context.fillText("Position X: " + Math.floor(ship.position.getX() * 10) / 10, 0, 10);
    context.fillText("Position Y: " + Math.floor(ship.position.getY() * 10) / 10, 0, 20);

    context.fillText("Velocity X: " + Math.floor(ship.velocity.getX() * 100) / 100, 0, 40);
    context.fillText("Velocity Y: " + Math.floor(ship.velocity.getY() * 100) / 100, 0, 50);

    context.fillText("Gravity: " + Math.floor(ship.gravity.getY() * 100) / 100, 0, 70);

    context.fillText("Acceleration X: " + Math.floor(ship.acceleration.getX() * 100) / 100, 0, 90);
    context.fillText("Acceleration Y: " + Math.floor(ship.acceleration.getY() * 100) / 100, 0, 100);

    context.fillText("Thrusting?: " + thrusting, 0, 120);
    context.fillText("Turning Left?: " + turningLeft, 0, 140);
    context.fillText("Turning Right?: " + turningRight, 0, 150);

    context.fillText("Bearing Angle: " + Math.floor(ship.bearing.getAngle() / (Math.PI * 2) * 360 + 90), 0, 170);
    context.fillText("Bearing Length: " + Math.floor(ship.bearing.getLength() * 1000) / 1000, 0, 180);

    context.fillText("Acceleration Angle: " + Math.floor(ship.acceleration.getAngle() / (Math.PI * 2) * 360 + 90), 0, 200);
    context.fillText("Acceleration Length: " + Math.floor(ship.acceleration.getLength() * 100000) / 100000, 0, 210);

    context.fillText("Fuel Meter: " + Math.floor(fuelMeter.nivel), 0, 230);
    context.fillText("Fuel Meter: " + noFuel, 0, 240);
};


// Indicar dados sobre condicoes aterragem

function statsLanding() {

    context.fillStyle = 'rgba(255,255,255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(500, 0, 300, 120); //limpar bem zona de dados

    context.fillStyle = 'black';

    context.fillText("Pos Y: " + Math.floor(ship.position.getY() * 100) / 100, 500, 10);
    context.fillText(">     Plat Topo: " + Math.floor((plataforma.posicaoY - 20) * 100) / 100, 580, 10);
    context.fillText(String(ship.position.getY() > plataforma.posicaoY - 20), 700, 10);

    context.fillText("Pos X: " + Math.floor(ship.position.getX() * 100) / 100, 500, 30);
    context.fillText(">     Plat Esq: " + Math.floor((plataforma.posicaoX+9) * 100) / 100, 580, 30);
    context.fillText(String(ship.position.getX() > plataforma.posicaoX+9), 700, 30);

    context.fillText("Pos X: " + Math.floor(ship.position.getX() * 100) / 100, 500, 40);
    context.fillText("<     Plat Dta: " + Math.floor((plataforma.posicaoX + plataforma.largura-9) * 100) / 100, 580, 40);
    context.fillText(String(ship.position.getX() < plataforma.posicaoX + plataforma.largura-9), 700, 40);

    context.fillText("Bearing: " + Math.floor((ship.bearing.getAngle() / (Math.PI * 2) * 360 + 90) * 100) / 100, 500, 60);
    context.fillText("<     Max Bearing: " + 10, 580, 60);
    context.fillText(String((ship.bearing.getAngle() / (Math.PI * 2) * 360 + 90) < 10), 700, 60);

    context.fillText("Bearing: " + Math.floor((ship.bearing.getAngle() / (Math.PI * 2) * 360 + 90) * 100) / 100, 500, 70);
    context.fillText(">     Max Bearing: " + -10, 580, 70);
    context.fillText(String((ship.bearing.getAngle() / (Math.PI * 2) * 360 + 90) > -10), 700, 70);

    context.fillText("Vel X: " + Math.floor(ship.velocity.getX() * 100) / 100, 500, 90);
    context.fillText("<     Max X: " + 0.66, 580, 90);
    context.fillText(String(ship.velocity.getX() < 0.66), 700, 90);

    context.fillText("Vel X: " + Math.floor(ship.velocity.getX() * 100) / 100, 500, 100);
    context.fillText(">     Min X: " + -0.66, 580, 100);
    context.fillText(String(ship.velocity.getX() > -0.66), 700, 100);

    context.fillText("Vel Y: " + Math.floor(ship.velocity.getY() * 100) / 100, 500, 120);
    context.fillText("<     Max Y: " + 1.50, 580, 120);
    context.fillText(String(ship.velocity.getY() < 1.50), 700, 120);
    };
