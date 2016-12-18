// Criar um criador de Objectos Particles usando a mesma logica da criaçao do criador de Objectos Vectores

var particle = function (x, y, speed, direction, grav) {

    // Começamos por definir as propriedades Position e Velocity
    // Começam por ser null para estarem assim no template e nao já definidos o que afectaria todas as Particles criadas    
    this.position = new vector(x, y);

    this.velocity = new vector(0.0, 0.00001);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.bearing = new vector(0.0, 0.0);
    this.bearing.setAngle(direction);

    this.acceleration = new vector(0.0, 0.0); // criar vector thrust inicialmente sem valores, mas que ira mudar com o mouse
    this.acceleration.setLength(0.0001);
    this.acceleration.setAngle(direction);

    this.gravity = new vector(0.0, grav || 0.00001);
    
    this.color = utils.getRandomColorHEX(); // atribuir uma propriedade Color a novas Particles

    this.turningLeft = false;
    this.turningRight = false;
    this.thrusting = false;



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

    
    // Adicionalmente, podemos criar uma função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    this.update = function () {
        this.position.addTo(this.velocity);
        this.velocity.addTo(this.gravity);
        this.velocity.addTo(this.acceleration);
    };

    
    this.edge = function () {
        // Evitar que a nave saia do ecra voltando a coloca-la no outro lado quando sair
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
    

    this.draw = function () {

    // Mecanica para criar ilusao de rotacao da ship via rotacao do canvas (como feito no Episode 5 com Arctangent 2)
    context.save(); // salvar o canvas

    context.translate(this.position.getX(), this.position.getY()); // transladar o canvas para a posicao da nave
    context.rotate(this.bearing.getAngle()); //rodar o canva pelo valor do angulo de ataque actual da nave

    // Desenhar a nave
    // Base da nave
    context.beginPath();
    context.fillStyle = this.color;
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 7);
    context.lineTo(10, 0);
    context.stroke();
    context.fill();

    // Desenhar a nave
    // Fumo atrás se tiver thrust
    if (this.thrusting) {
        context.fillStyle = "yellow";
        context.moveTo(-10, -3.5);
        context.lineTo(-18, 0);
        context.lineTo(-10, 3.5);
        context.lineTo(-10, -3.5);
        context.stroke();
        context.fill;
    };
    // Restaurar rotacao do canvas apos desenhar a nave  
    context.restore();

    };

};