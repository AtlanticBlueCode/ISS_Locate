
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    heigth = canvas.height = window.innerHeight;


var lifespan = 200;             // Número de frames que cada nave vai viver
var lifecount = 0;
var maxfit = 0;
var generation = 1;

var target = function () {
    this.position = new vector (width-100, 100);
    this.radius = 10;
    this.draw = function () {
        context.beginPath();
        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        context.arc(this.position.getX(), this.position.getY(), this.radius, 0, Math.PI * 2);
        context.stroke();
        context.fill();
    };
};

var alvo = new target();

var population = function () {
    this.ships = [];
    this.size = 30;

    for (var i = 0; i < this.size; i++) {
        this.ships[i] = new ship();     //criar nave nova, parada e sem gravidade
    };

    this.edge = function () {
        for (var i = 0; i < this.ships.length; i++) {
            if (this.ships[i].position.getX() > width ||
                this.ships[i].position.getX() < 0 ||
                this.ships[i].position.getY() > heigth ||
                this.ships[i].position.getY() < 0) {
                
                this.ships.splice(i,1);
            };
        };
    };

    
    this.matingpool = [];
    
    this.evaluate = function () {
        maxfit = 0;
        for (var i = 0; i < this.ships.length; i++) {
            this.ships[i].calcFitness();
            if (this.ships[i].fitness > maxfit) {
                maxfit = this.ships[i].fitness
            };
        };

        for (var i = 0; i < this.ships.length; i++) {
            this.ships[i].fitness /= maxfit;
        };

        for (var i = 0; i < this.ships.length; i++) {
            var n = this.ships[i].fitness * 5000;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.ships[i]);
            };
        };
        console.log(this.matingpool);
    };

    this.selection = function () {
        var newpopulation = [];
        for (var i = 0; i < this.ships.length; i++) {
            var parentA = this.matingpool[Math.floor(Math.random() * this.matingpool.length)].dna;
            var parentB = this.matingpool[Math.floor(Math.random() * this.matingpool.length)].dna;
            var child = parentA.crossover(parentB);
            child.mutation();
            newpopulation[i] = new ship(child);
        };
        this.ships = newpopulation;
    };
};


var DNA = function (genes) {
    if (genes) {                //Verifica se este Objecto DNA já está a receber genes como argumento ou se os deve criar de raiz
        this.genes = genes;
    }
    else {
        this.genes = [];

        for (var i = 0; i < lifespan; i++) {
            this.genes[i] = new vector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
        };
    };

    this.crossover = function (partner) {
        var newgenes = [];
        var midpoint = (Math.random() * this.genes.length).toFixed(0);
        for (var i = 0; i < this.genes.length; i++) {
            if (i > midpoint) {
                newgenes[i] = this.genes[i];
            }
            else {
                newgenes[i] = partner.genes[i];
            };
        };
        return new DNA(newgenes);
    };

    this.mutation = function () {
        for (var i = 0; i < this.genes.length; i++) {
            if (Math.random() < 0.005) {
                this.genes[i] = new vector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
            };
        };
    };
};


var clearScreen = function () {                         // Limpeza de ecra para rendering    
    context.fillStyle = 'rgba(255, 255, 255, .35)'; // para criar efeito fade pinto todo o canvas deixando um opacity 0.15
    context.fillRect(0, 0, canvas.width, canvas.height); //limpar o canvas todo no inicio da nova frame

    context.fillStyle = 'rgba(255, 255, 255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 200, 190); //limpar bem zona de dados  
};

var showData = function () {                        // Indicar dados sobre a ship
    context.fillStyle = 'black';
    context.fillText("Vida: " + lifecount, 0, 10);
    context.fillText("Bots: " + popul.ships.length, 0, 20);
    context.fillText("Maxfit: " + maxfit.toFixed(2), 0, 30);
    context.fillText("Generation: " + generation, 0, 40);
    

  //  context.fillText("Max Fit: " + maxfit, 0, 30);

    /*
        context.fillText("Position X: " + ship.position.getX().toFixed(2), 0, 10);
        context.fillText("Position Y: " + ship.position.getY().toFixed(2), 0, 20);
    
        context.fillText("Speed X: " + ship.velocity.getX().toFixed(2), 0, 40);
        context.fillText("Speed Y: " + ship.velocity.getY().toFixed(2), 0, 50);
    
        context.fillText("Gravity: " + ship.gravity.getY().toFixed(2), 0, 70);
    
        context.fillText("Thrust X: " + ship.acceleration.getX().toFixed(2), 0, 90);
        context.fillText("Thrust Y: " + ship.acceleration.getY().toFixed(2), 0, 100);
    
        context.fillText("Thrusting?: " + ship.thrusting, 0, 120);
    
        context.fillText("Turning Left?: " + ship.turningLeft, 0, 140);
        context.fillText("Turning Right?: " + ship.turningRight, 0, 150);
    
        context.fillText("Bearing: " + (ship.bearing.getAngle() / (Math.PI * 2) * 360 +90).toFixed(2), 0, 170);
*/
};
    
var popul = new population();

loop(); //necessario chamar a funcao pela primeira vez, fora da propria funcao


function loop() {

    clearScreen();
    showData();

    alvo.draw();

    for (var i = 0; i < popul.ships.length; i++) {
        popul.ships[i].accelerate();
        popul.ships[i].update(); //actualizar vector de posicao e movimento
        popul.ships[i].calcFitness();
        popul.ships[i].draw();
    };

//        popul.edge();

    
    lifecount++;

    if (lifecount == lifespan) {
        popul.evaluate();
        popul.selection();
        lifecount = 0;
        console.log(popul);
        popul.matingpool = [];
        generation++;

//        popul = new population();
    };

        requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
};
    
