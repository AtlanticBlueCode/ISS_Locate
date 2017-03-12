// Criar um criador de Objectos Particles usando a mesma logica da criaçao do criador de Objectos Vectores

// Constructor function
function missile (x, y, speed, direction) {

    // Começamos por definir as propriedades Position e Velocity
    // Começam por ser null para estarem assim no template e nao já definidos o que afectaria todas as Particles criadas    
    this.size = 3;
    this.blastRadius = 100;
    
    this.position = new vector(x, y);

    this.velocity = new vector(0.0, 0.00001);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.bearing = new vector(0.0, 0.0);
    this.bearing.setAngle(direction);
  
    this.color = "lightblue"; // atribuir uma propriedade Color a novas Particles

    this.hit = false;    

    this.hitCheck = function (asteroid) {
        if (Math.abs(this.position.getX() - asteroid.position.getX()) <= this.blastRadius + asteroid.radius &&
            Math.abs(this.position.getY() - asteroid.position.getY()) <= this.blastRadius + asteroid.radius) {
            return true;
        } else {
            return false;
        }
    };

    
    // Função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    this.update = function () {
        this.position.addTo(this.velocity);
    };
    
    this.edge = function () {
        if (this.position.getX() > width ||
            this.position.getX() < 0 ||
            this.position.getY() > heigth ||
            this.position.getY() < 0) {
            return true;
        }
    }    

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.getX(), this.position.getY(), this.size, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = 'rgba(0, 0,255,0.1)';
        context.arc(this.position.getX(), this.position.getY(), this.blastRadius, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
        context.closePath();
    };

};


