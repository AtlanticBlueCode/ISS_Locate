
function PowerUp(x, y, type) {

    this.type = type;    
    
    this.value = 5;

    this.radius = 10;

    this.position = new vector(x, y);

    this.color = utils.getRandomYellowColorRGB(); // atribuir uma propriedade Color a novas Particles

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.strokeStyle = "blue";
        context.arc(this.position.getX(), this.position.getY(), this.radius, 0, Math.PI * 2);
        context.stroke();
        context.fill();
        context.closePath();
    };

};