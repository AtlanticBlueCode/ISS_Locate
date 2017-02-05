
// Constructor function
function asteroid(x, y, rad) {

    this.radius = rad || Math.random() * 20 + 10;

    this.rotation = 0;
    this.rotationSpeed = Math.random() * 0.06 - 0.03;

    this.numVertices = Math.floor(Math.random() * 11) + 6;
    this.vertices = [];
    for (var i = 0; i < this.numVertices; i++) {
        this.vertices[i] = Math.random() * -12.5 + 5;
    }

    this.position = new vector(x||Math.random() * width, y||Math.random() * heigth);

    this.velocity = new vector(0.0, 0.00001);
    this.velocity.setLength(Math.random() * 4);
    this.velocity.setAngle(Math.random() * Math.PI * 2);

    this.color = utils.getRandomRedColorRGB(); // atribuir uma propriedade Color a novas Particles


    // Função para actualizar a Position da Particle em cada iteracao tendo em conta a sua Velocity
    this.update = function () {
        this.position.addTo(this.velocity);
    };

    
    this.break = function (x) {
        var blocks = x || Math.floor(Math.random()*2)+2;
        for (var i = 0; i < blocks; i++) {
            Asteroids.push(new asteroid(this.position.getX(), this.position.getY(), this.radius / 1.25));
        };
    };

    // Evitar que a nave saia do ecra voltando a coloca-la no outro lado quando sair
    this.edge = function () {
        if (this.position.getX() - this.radius > width) {
            this.position.setX(0 - this.radius);
        };
        if (this.position.getX() + this.radius < 0) {
            this.position.setX(width + this.radius);
        };
        if (this.position.getY() - this.radius > heigth) {
            this.position.setY(0 - this.radius);
        };
        if (this.position.getY() + this.radius < 0) {
            this.position.setY(heigth + this.radius);
        };
    };


    this.draw = function () {

        this.rotation += this.rotationSpeed;
        // Mecanica para criar ilusao de rotacao da ship via rotacao do canvas (como feito no Episode 5 com Arctangent 2)
        context.save(); // salvar o canvas

        context.translate(this.position.getX(), this.position.getY()); // transladar o canvas para a posicao da nave
        context.rotate(this.rotation); //rodar o canvas pelo valor do angulo de ataque actual da nave

        // Desenhar a nave
        // Base da nave
        context.fillStyle = this.color;
        context.beginPath();
        for (var i = 0; i < this.numVertices; i++) {
            var angle = utils.map(i, 0, this.numVertices, 0, Math.PI * 2);
            var r = this.radius + this.vertices[i];
            var x = r * Math.cos(angle);
            var y = r * Math.sin(angle);
            context.lineTo(x, y);
        }
        context.closePath();

        context.stroke();
        context.fill();

        context.restore();

    };

};