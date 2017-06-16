// Criar um criador de Objectos Particles usando a mesma logica da criaçao do criador de Objectos Vectores

// Constructor function
function car (x, y, speed, direction, grav) {

    this.width = 30;
    this.heigth = 18;
    
    this.position = new vector(x, y);

    this.velocity = new vector(0.0, 0.0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.bearing = new vector(0.0, 0.0);
    this.bearing.setAngle(direction);

    this.acceleration = new vector(0.0, 0.0); // criar vector thrust inicialmente sem valores, mas que ira mudar com o mouse
    this.acceleration.setAngle(direction);

    this.maxVelocity = 10;
    this.friction = 0.95;

    // fazer friction maior em funcao de bearing diferente de direction

    this.turningLeft = false;
    this.turningRight = false;
    this.thrusting = false;
    this.reversing = false;

    this.crashed = false;

    this.accelerate = function () {
        if (this.thrusting == true) {
            this.acceleration.setLength(0.4);
            this.acceleration.setAngle(this.bearing.getAngle());            
            }
        else if (this.reversing == true) {
            this.acceleration.setLength(0.20);
            this.acceleration.setAngle(this.bearing.getAngle()+Math.PI);            
            }
        else {
            this.acceleration.setLength(0.0);
            this.acceleration.setAngle(this.bearing.getAngle());            
            };

        if (this.turningLeft == true) {
            this.bearing.setAngle(this.bearing.getAngle() - Math.min(0.06,0.02*Math.abs(this.velocity.getLength())));
            this.velocity.setAngle(this.velocity.getAngle() - Math.min(0.035,0.02*Math.abs(this.velocity.getLength())));
            this.acceleration.setAngle(this.acceleration.getAngle() - Math.min(0.06,0.02*Math.abs(this.velocity.getLength())));
            };

        if (this.turningRight == true) {
            this.bearing.setAngle(this.bearing.getAngle() + Math.min(0.06,0.02*Math.abs(this.velocity.getLength())));
            this.velocity.setAngle(this.velocity.getAngle() + Math.min(0.035,0.02*Math.abs(this.velocity.getLength())));
            this.acceleration.setAngle(this.acceleration.getAngle() + Math.min(0.06,0.02*Math.abs(this.velocity.getLength())));
            };
        };

    
    // Função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    this.update = function () {
        if (this.velocity.getLength() > this.maxVelocity) {
            this.velocity.setLength(this.maxVelocity);
            };
        this.position.addTo(this.velocity);
        this.velocity.addTo(this.acceleration);
        this.velocity.multiplyBy(this.friction);        
    };

    
    // Evitar que a nave saia do ecra voltando a coloca-la no outro lado quando sair
    this.edge = function () {
        if (this.position.getX() > width) {
            this.position.setX(0);
        };
        if (this.position.getX() < 0) {
            this.position.setX(width);
        };
        if (this.position.getY() > heigth) {
            this.position.setY(0);
        };
        if (this.position.getY() < 0) {
            this.position.setY(heigth);
        };
    };

    this.hitCone = function () {
        for (var i = Cones.length - 1; i >= 0; i--) {
            if (Math.abs(this.position.getX() - Cones[i].position.getX()) < 20 &&
                Math.abs(this.position.getY() - Cones[i].position.getY()) < 20) {
                Cones.splice(i, 1)
                Score += 1;
            };
        };
    };
    
    this.offtrack = function () {
        var positionPixelData = contextPista.getImageData(Math.abs(this.position.getX()), Math.abs(this.position.getY()), 1, 1).data;
        if (positionPixelData[3] === 0) {
//            console.log(positionPixelData)
            this.crashed=true;
        }
    };

    this.draw = function () {
        // Mecanica para criar ilusao de rotacao da ship via rotacao do canvas (como feito no Episode 5 com Arctangent 2)
        context.save(); // salvar o canvas
        context.translate(this.position.getX(), this.position.getY()); // transladar o canvas para a posicao da nave
        context.rotate(this.bearing.getAngle()); //rodar o canva pelo valor do angulo de ataque actual da nave

        // Desenhar o carro
        drawCar(-this.width/2, -this.heigth/2, this.width, this.heigth);        
    
        // Restaurar rotacao do canvas apos desenhar a nave
        context.restore();

    };

};