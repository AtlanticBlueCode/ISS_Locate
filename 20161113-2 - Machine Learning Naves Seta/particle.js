
var ship = function (dna) {

    this.position = new vector(100, heigth-100);

    this.velocity = new vector(0.0, 0.0);
    this.velocity.setLength(0.0);
    this.velocity.setAngle(0.0);

    this.bearing = new vector(0.0, 0.0);
    this.bearing.setAngle(0);

    this.acceleration = new vector(0.0, 0.0);
    this.acceleration.setLength(0.0);
    this.acceleration.setAngle(0.0);

    this.color = utils.getRandomColorHEX(); // atribuir uma propriedade Color a novas Particles
    
    if (dna) {
        this.dna = dna;
    }
    else {
        this.dna = new DNA();
    };

/*

//    this.geneCounter = 0;
    
*/

    this.fitness = 0;
    
    this.accelerate = function () {
        this.acceleration = this.dna.genes[lifecount];
//        this.geneCounter = this.geneCounter ++;
    };


    this.update = function () {
        this.velocity.addTo(this.acceleration);
        this.position.addTo(this.velocity);
        this.bearing.setAngle(this.velocity.getAngle());
    };

    this.calcFitness = function () {
        var distance = utils.distanceXY(this.position.getX(), this.position.getY(), alvo.position.getX(), alvo.position.getY());
        console.log(distance);
        this.fitness = utils.map(distance,0, Math.sqrt(width*width+heigth*heigth),Math.sqrt(width*width+heigth*heigth), 0);
        console.log(this.fitness);
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

    // Restaurar rotacao do canvas apos desenhar a nave
    context.restore();
    };

};
