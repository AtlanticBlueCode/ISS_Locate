
// Constructor function
function powerup(x, y, type) {

    this.type = type;    
    
    this.value = 5;

    this.radius = 10;

    this.numVertices = 5;
    this.vertices = [];
    for (var i = 0; i < this.numVertices; i++) {
        this.vertices[i] = this.numVertices;
    };

    this.position = new vector(x, y);

    this.color = "yellow"; // atribuir uma propriedade Color a novas Particles

    this.draw = function () {
        context.save(); // salvar o canvas

        context.translate(this.position.getX(), this.position.getY()); // transladar o canvas para a posicao da nave
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