// Criar um criador de Objectos Particles usando a mesma logica da criaçao do criador de Objectos Vectores

var particle = {

    // Começamos por definir as propriedades Position e Velocity
    // Começam por ser null para estarem assim no template e nao já definidos o que afectaria todas as Particles criadas    
    position: null,
    velocity: null,
    acceleration: null,
    gravity: null,
    color: null, // atribuir uma propriedade Color a novas Particles
    bearing: null,
    thrusting: false,
    turningLeft: false,
    turningRight: false,

    // Depois criamos a funçao criadora de Particles
    // A funcao toma como input a posicao incial da Particle a sua Speed e Direction que serao inputs para o Vector Velocity da particula
    // Definimos a Speed e Direction do vector Velocity usando os metodos setLength e setAngle nesse vector
    // Definimos tambem um vector Graviy da Particle que será opcional com default para 0    
    create: function (x, y, speed, direction, grav) {
        var obj = Object.create(this);
        obj.position = vector.create(x, y);
        obj.velocity = vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.bearing = vector.create(0, 0);
        obj.bearing.setLength(1);
        obj.bearing.setAngle(direction);
        obj.acceleration = vector.create(0, 0);
        obj.acceleration.setLength(1);
        obj.acceleration.setAngle(direction);
        obj.gravity = vector.create(0, grav || 0); // Vector com x de 0 e y opcional com default de 0
        obj.color = utils.getRandomColorHEX(); // Definir a cor desta Particle
        return obj;
    },

    accelerate: function () {
        if (this.thrusting == true) {
            this.acceleration.setLength(0.1);
            }
        else {
            this.acceleration.setLength(0.0000001);
            };
        if (this.turningLeft == true) {
            this.acceleration.setAngle(this.acceleration.getAngle() - 0.05);
            this.bearing.setAngle(this.bearing.getAngle()- 0.05);
            };
        if (this.turningRight == true) {
            this.acceleration.setAngle(this.acceleration.getAngle()+0.05);
            this.bearing.setAngle(this.bearing.getAngle()+ 0.05);
            };
    },
    
    // Adicionalmente, podemos criar uma função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    update: function () {
        this.position.addTo(this.velocity);
        this.velocity.addTo(this.gravity);
        this.velocity.addTo(this.acceleration);
    },

    // Funcao Screen para ver se a nave esta dentro do ecra e se nao estiver plotar onde faca sentido    
    screen: function () {
        if (this.position.getX() > width) {
            this.position.setX(0);
        }
        if (this.position.getX() < 0) {
            this.position.setX(width);
        }
        if (this.position.getY() > height) {
            this.position.setY(0);
        }
        if (this.position.getY() < 0) {
            this.position.setY(height);
        }
    },

};