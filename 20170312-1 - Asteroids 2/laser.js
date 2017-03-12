// Criar um criador de Objectos Particles usando a mesma logica da criaçao do criador de Objectos Vectores

// Constructor function
function laser (x, y, speed, direction) {

    // Começamos por definir as propriedades Position e Velocity
    // Começam por ser null para estarem assim no template e nao já definidos o que afectaria todas as Particles criadas    
    this.size = 2;
    
    this.position = new vector(x, y);

    this.velocity = new vector(0.0, 0.00001);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.bearing = new vector(0.0, 0.0);
    this.bearing.setAngle(direction);
  
    this.color = "gold"; // atribuir uma propriedade Color a novas Particles

    this.hit = false;    

    this.hitCheck = function (asteroid) {
        if (Math.abs(this.position.getX() - asteroid.position.getX()) <= this.size + asteroid.radius &&
            Math.abs(this.position.getY() - asteroid.position.getY()) <= this.size + asteroid.radius) {
            return true;
        } else {
            return false;
        }
    };

    this.edge = function () {
        if (this.position.getX() > width ||
            this.position.getX() < 0 ||
            this.position.getY() > heigth ||
            this.position.getY() < 0) {
            return true;
        }
    };
    
    // Função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    this.update = function () {
        this.position.addTo(this.velocity);
    };
    

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.getX(), this.position.getY(), this.size, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
        context.closePath();
    };

};


