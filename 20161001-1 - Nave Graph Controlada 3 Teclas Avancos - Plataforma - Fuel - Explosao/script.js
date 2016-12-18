
// Criar particula nave e vector thrust
var ship = particle.create(0, 0, 5, 0, 0.03); //criar particula nave no centro, parada e sem gravidade

// Criar fuel meter
fuelMeter.create();

// Criar plataforma
plataforma.create();

// definir caracteristicas de thrust
var turningLeft = false, // em rotacao para a esquerda
    turningRight = false, // em rotacao para a direita
    thrusting = false, // em acelerecao
    aterragem = false,
    crash = false,
    fora = false,
    noFuel = false,
    gameOver = false;


function update() {

    // Limpeza de ecra para rendering    
    context.fillStyle = 'rgba(255,255,255, .4)'; // para criar efeito fade pinto todo o canvas deixando um opacity 0.15
    context.fillRect(0, 0, canvas.width, canvas.height); //limpar o canvas todo no inicio da nova frame

    // Indicação de dados sobre nave e aterragem
    statsLanding();
    statsShip();

    // Mecanica para criar ilusao de rotacao da ship via rotacao do canvas (como feito no Episode 5 com Arctangent 2)
    context.save(); // salvar o canvas

    context.translate(ship.position.getX(), ship.position.getY());  // transladar o canvas para a posicao da nave
    context.rotate(ship.bearing.getAngle() + Math.PI * 0.5);        //rodar o canvas pelo valor do angulo de ataque actual da nave

    // Desenhar nave
    drawShip();
    
    // Desenhar thrusters e gastar fuel se thrusting true e ainda houver fuel
    if (thrusting == true && noFuel == false) {
        drawThrusters();
        fuelMeter.nivel -= 1;
    } 
    
    // Restaurar rotacao do canvas apos desenhar a nave  
    context.restore();

    // actualizacao da nave    
    ship.base();                // testar aterragem cumprida
    ship.accelerate();          // incorporar o vector thrust como aceleracao
    ship.screen();              // correr mecanica para manter nave no ecra

    if (gameOver == false) {    // verificar se jogo acabou
    ship.update();              // Actualizar posição da particula ship    
    }; 
    
    // Desenhar a Plataforma
    plataforma.draw();  // Plataforma

    // Desenhar e actualizar Fuel Meter
    fuelMeter.update();
    fuelMeter.draw();  

    // Verificar se se cumprem condiçoes de fim e se sim executar sequencias de fim
    endCheck();
    
    
    requestAnimationFrame(update); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
};

update();

