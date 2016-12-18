// Criar um criador de Objectos Particles usando a mesma logica da criaçao do criador de Objectos Vectores

var shot = {

    // Começamos por definir as propriedades Position e Velocity
    // Começam por ser null para estarem assim no template e nao já definidos o que afectaria todas as Particles criadas    
    position: null,
    velocity: null,
    acceleration: null,
    gravity: null,
    color: null, // atribuir uma propriedade Color a novas Particles
    bearing: null,
    size:2,

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

    // Adicionalmente, podemos criar uma função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    update: function () {
        this.position.addTo(this.velocity);
        this.velocity.addTo(this.gravity);
/*        this.velocity.addTo(this.acceleration);*/
    },

    draw: function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.getX(), this.position.getY(), this.size, 0, Math.PI * 2, false);
        context.fill();
    },

    hitCheck_A: function () {
        if( utils.absolute(this.position.getX() - ship_A.position.getX()) < 15 &&
            utils.absolute(this.position.getY() - ship_A.position.getY()) < 15){
            console.log("B hits A!");
            ship_A_Hit = true;
            ship_B_Score += 1;
            shotsFired_B = []
        };        
    },

    hitCheck_B: function () {
        if( utils.absolute(this.position.getX() - ship_B.position.getX()) < 15 &&
            utils.absolute(this.position.getY() - ship_B.position.getY()) < 15){
            console.log("A hits B!");
            ship_B_Hit=true;
            ship_A_Score += 1;
            shotsFired_A = []
        };        
    },

};

