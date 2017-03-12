function Fairy (x, y, speed, direction, grav) {

    this.position = new vector(x, y);

    this.velocity = new vector(0.0, 0.00001);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.bearing = new vector(0.0, 0.0);
    this.bearing.setAngle(direction);

    this.acceleration = new vector(0.0, 0.0); // criar vector thrust inicialmente sem valores, mas que ira mudar com o mouse
    this.acceleration.setLength(0.0001);
    this.acceleration.setAngle(direction);

    this.gravity = new vector(0.0, grav);

    this.attritionX = 0.009;
    
    this.maxVelocity = 10;
    
    this.color = "navy"; // atribuir uma propriedade Color a novas Particles

    this.turningLeft = false;
    this.turningRight = false;
    this.thrusting = false;

    this.hit = false;    

    this.accelerate = function () {
        if (this.thrusting == true) {
            this.acceleration.setLength(0.1);
            }
        else {
            this.acceleration.setLength(0.00001);
            };

        if (this.turningLeft == true) {
            this.acceleration.setAngle(this.acceleration.getAngle() - 0.05);
            this.bearing.setAngle(this.bearing.getAngle() - 0.05);
            };

        if (this.turningRight == true) {
            this.acceleration.setAngle(this.acceleration.getAngle() + 0.05);
            this.bearing.setAngle(this.bearing.getAngle() + 0.05);
            };
        };


    this.land = function () {
        for (var i = 0; i < CloudPads.length; i++) {
            if (
                this.position.getX() > CloudPads[i].x -CloudPads[i].w/2 + 15 &&     // está à direita da esquerda do pad
                this.position.getX() < CloudPads[i].x + CloudPads[i].w/2 - 15 &&    // está à esquerda da direita do pad
                this.position.getY() < CloudPads[i].y - 10 &&                       // está acima do topo do pad
                this.velocity.getY() > 0 &&                                         // está a cair
                this.position.getY() + this.velocity.getY() >= CloudPads[i].y - 10  // a esta velocidade y vai ficar abaixo to topo do pad
                ) {
                this.velocity.setY(0);
                this.acceleration.setAngle(direction);
                this.bearing.setAngle(direction);
            }
        };
    };

    this.powerup = function () {
        for (var i = PowerUps.length-1; i >=0; i--) {
            if (Math.abs(this.position.getX() - PowerUps[i].position.getX()) <= 3+ PowerUps[i].radius &&
                Math.abs(this.position.getY() - PowerUps[i].position.getY()) <= 3+ PowerUps[i].radius) {
                PowerUps.splice(i, 1)
                Score += 1;
            };
        };
    };

    // Função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    this.update = function () {
        if (this.velocity.getLength() > this.maxVelocity) {
            this.velocity.setLength(this.maxVelocity);
        };

        if (this.position.getY() >= height - 10) {
            this.gravity.setY(0.00001)
//            this.velocity.setX(0.00001)

        } else {
            this.gravity.setY(grav)
        };
        
        this.position.addTo(this.velocity);
        this.velocity.addTo(this.acceleration);
        this.velocity.addTo(this.gravity);

        this.velocity.setX(this.velocity.getX() * (1-this.attritionX));
    };

    
    // Evitar que a nave saia do ecra voltando a coloca-la no outro lado quando sair
    this.edge = function () {
        if (this.position.getX() > width+10) {
            this.position.setX(0-10);
        };
        if (this.position.getX() < 0-10) {
            this.position.setX(width+10);
        };
        if (this.position.getY() > height-10) {
            this.position.setY(height - 10);
            this.velocity.setY(0);
            this.acceleration.setAngle(direction);
            this.bearing.setAngle(direction);
        };
        if (this.position.getY() < -100) {
            this.position.setY(-100);
            this.velocity.setY(0);
        };
    };
    

    this.draw = function () {
        // Mecanica para criar ilusao de rotacao da ship via rotacao do canvas (como feito no Episode 5 com Arctangent 2)

        // Thrust
        context.save(); // salvar o canvas
        context.translate(this.position.getX(), this.position.getY()); // transladar o canvas para a posicao da nave
        context.rotate(this.bearing.getAngle()+Math.PI*1/2); //rodar o canva pelo valor do angulo de ataque actual da nave
        if (this.thrusting) {
            drawTrail(0-10, -2, 20, 40);
        };
        context.restore();

        // Fada
        context.save(); // salvar o canvas
        context.translate(this.position.getX(), this.position.getY()); // transladar o canvas para a posicao da nave
        context.rotate(this.bearing.getAngle() +Math.PI*0.5); //rodar o canva pelo valor do angulo de ataque actual da nave
        drawFairy(0-25, 0-40, 50, 50);        
        context.restore(); // salvar o canvas

    };

};