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
        obj.color = getRandomColor(); // Definir a cor desta Particle
        return obj;
    },

    accelerate: function () {
        if (thrusting == true && noFuel == false) {
            this.acceleration.setLength(0.1);
            }
        else {
            this.acceleration.setLength(0.0000001);
            };
        if (turningLeft == true) {
            this.acceleration.setAngle(this.acceleration.getAngle() - 0.05);
            this.bearing.setAngle(this.bearing.getAngle()- 0.05);
            };
        if (turningRight == true) {
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
//            this.position.setX(0);
            fora = true;
        }
        if (this.position.getX() < 0) {
//            this.position.setX(width);
            fora = true;
        }
        if (this.position.getY() > height-20) {
//            this.position.setY(height - 20);
//            this.velocity.setLength(0);
            crash = true;
        }
//        if (this.position.getY() < 0) {
//            this.position.setY(height);
//        }
    },

    base: function () {
        if (
            this.position.getY() > plataforma.posicaoY - 20)    // Ao nível da plataforma?
            if(
                this.position.getX() > plataforma.posicaoX+9 &&                      // À direita da esquerda da plataforma
                this.position.getX() < plataforma.posicaoX + plataforma.largura-9)   // À esquerda da direita da plataforma
                if (
                    this.bearing.getAngle()/ (Math.PI * 2) * 360 + 90 < 10 &&          // Ângulo não muito virado para a direita
                    this.bearing.getAngle()/ (Math.PI * 2) * 360 + 90 > -10 &&          // Ângulo não muito virado para a esquerda

                    this.velocity.getX() < 0.66 &&      // Velocidade para a direita reduzida
                    this.velocity.getX() > -0.66 &&     // Velocidade para a esquerda reduzida
                    this.velocity.getY() < 1.50)        // Velocidade para baixo reduzida
                    {
                    aterragem = true;
                    }
                else {
                    crash = true;
                    }
            else if (
                this.position.getY() > height-21)    // Ao nível do chão?
                    {
                crash = true;
            };
    },
};