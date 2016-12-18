
update();

function update() {

    // Limpeza de ecra para rendering    
    context.fillStyle = 'rgba(255,255,255, 1)'; // para criar efeito fade pinto todo o canvas deixando um opacity 0.15
    context.fillRect(0, 0, canvas.width, canvas.height); //limpar o canvas todo no inicio da nova frame
    
    // Indicar stats sobre ships
    statsShip_A();    
    statsShip_B();   
    
    // Indicar pontuação
    scoreBoard();
    
    
    // criar um nova shot A
    if (shotFired_A == true) {
        if (ship_A_Hit !== true &&              // ainda nao atingida a nave A
            ship_B_Hit !== true &&              // ainda nao atingida a nave B
            shotsFired_A.length < maxLiveShots) // limita numero maximo de tiros vivos em cada momento
            {   
                num_shotsFired_A += 1;
                shotsFired_A.push(shot.create(ship_A.position.getX(), ship_A.position.getY(), 15, ship_A.bearing.getAngle(), 0));
        };
    };    

    // avançar as shots A ja existentes, desenha-las e ver se atingem alvos   
    for (var i = 0; i <shotsFired_A.length; i++) {
        var shot_i = shotsFired_A[i];
        shot_i.update();
        shot_i.draw();
        shot_i.hitCheck_B();
    };

    // Eliminar shots A já saidas do ecra
    for (var i = shotsFired_A.length - 1; i >= 0; i--){
        var shot_i = shotsFired_A[i];
        if (shot_i.position.getX() > width ||
            shot_i.position.getX() < 0 ||
            shot_i.position.getY() > height ||
            shot_i.position.getY() < 0){
            shotsFired_A.splice(i, 1);
        }
    };
     
    // criar um nova shot B
    if (shotFired_B == true) {
        if (ship_A_Hit !== true &&              // ainda nao atingida a nave A
            ship_B_Hit !== true &&              // ainda nao atingida a nave B
            shotsFired_B.length < maxLiveShots) {   // limita numero maximo de tiros vivos em cada momento
                num_shotsFired_B += 1;
                shotsFired_B.push(shot.create(ship_B.position.getX(), ship_B.position.getY(), 15, ship_B.bearing.getAngle(), 0));
        };
    };    
    
    // avançar as shots B ja existentes, desenha-las e ver se atingem alvos   
    for (var i = 0; i <shotsFired_B.length; i++) {
        var shot_i = shotsFired_B[i];
        shot_i.update();
        shot_i.draw();
        shot_i.hitCheck_A();
    };
    
    // Eliminar shots B já saidas do ecra
    for (var i = shotsFired_B.length - 1; i >= 0; i--){
        var shot_i = shotsFired_B[i];
        if (shot_i.position.getX() > width ||
            shot_i.position.getX() < 0 ||
            shot_i.position.getY() > height ||
            shot_i.position.getY() < 0){
            shotsFired_B.splice(i, 1);
        }
    };


    if (ship_A_Hit == true) { drawExplosion_A() };
    if (ship_B_Hit == true) { drawExplosion_B() };
    
    

    // Mecanica para criar ilusao de rotacao da ship via rotacao do canvas (como feito no Episode 5 com Arctangent 2)
    context.save(); // salvar o canvas
    context.translate(ship_A.position.getX(), ship_A.position.getY()); // transladar o canvas para a posicao da nave
    context.rotate(ship_A.bearing.getAngle() + Math.PI * 0.5); //rodar o canvas pelo valor do angulo de ataque actual da nave

    // Desenhar a nave
    // Importante faze-lo apenas depois de desenhada a explosao
    // Para, se nao for a nave atingida, ficar por cima dela e se for a atingida, não chegar a desenhar a nave
    if (ship_A_Hit !== true) {
        drawShip_A();                                // Base da nave
        if (ship_A.thrusting == true) {              // Chama atrás se tiver thrust  
            drawThrusters_A()};
        };                

    // Restaurar rotacao do canvas apos desenhar a nave
    context.restore();

    // Mecanica para criar ilusao de rotacao da ship via rotacao do canvas (como feito no Episode 5 com Arctangent 2)
    context.save(); // salvar o canvas
    context.translate(ship_B.position.getX(), ship_B.position.getY()); // transladar o canvas para a posicao da nave
    context.rotate(ship_B.bearing.getAngle() + Math.PI * 0.5); //rodar o canvas pelo valor do angulo de ataque actual da nave

    // Desenhar a nave
    // Importante faze-lo apenas depois de desenhada a explosao
    // Para, se nao for a nave atingida, ficar por cima dela e se for a atingida, não chegar a desenhar a nave
    if (ship_B_Hit !== true) {
        drawShip_B();                                // Base da nave
        if (ship_B.thrusting == true) {              // Chama atrás se tiver thrust  
            drawThrusters_B()};
        };                

    // Restaurar rotacao do canvas apos desenhar a nave
    context.restore();
    

    // Actualizar posição da particula ship    
    ship_A.accelerate();            // incorporar o vector thrust como acleracao
    ship_A.screen();                // correr mecanica para manter nave no ecra
    if (ship_A_Hit == false) { ship_A.update() };                // actualizar vector de posicao e movimento

    ship_B.accelerate();            // incorporar o vector thrust como acleracao
    ship_B.screen();                // correr mecanica para manter nave no ecra
    if (ship_B_Hit == false) { ship_B.update() };                // actualizar vector de posicao e movimento

    

    requestAnimationFrame(update);  //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
};

