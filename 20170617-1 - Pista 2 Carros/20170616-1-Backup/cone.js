
function Cone(x, y, type) {

    this.type = type;    
    
    this.value = 5;

    this.radius = 25;

    this.position = new vector(x, y);

    this.color = utils.getRandomYellowColorRGB(); // atribuir uma propriedade Color a novas Particles

    this.draw = function () {
        context.save(); // salvar o canvas
        context.translate(this.position.getX(), this.position.getY()); // transladar o canvas para a posicao da nave
        drawCone(-this.radius/2, -this.radius/2, this.radius, this.radius);        
        context.restore();
    };
};