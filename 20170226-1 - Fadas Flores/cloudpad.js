
function CloudPad(x, y, w, h) {

    this.x = x || Math.random() * width / 2 + width / 4;
    this.y = y || Math.random() * height*1/2 + height / 10;
    this.w = 150;
    this.h = 40;

    this.color = utils.getRandomRedColorRGB(); // atribuir uma propriedade Color a novas Particles

    this.draw = function () {
        drawCloud(this.x-this.w/2, this.y-7, this.w, this.h)
    };

    this.seed = function () {
        if (Math.random() > 1 - PowerUpProb) {
            PowerUps.push(new PowerUp(this.x-this.w/2+30+Math.random()*(this.w-60), this.y - 5));
        };
    };
    
};