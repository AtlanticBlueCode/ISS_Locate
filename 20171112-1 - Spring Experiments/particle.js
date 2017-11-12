class Particle {

    constructor(x, y, speed, direction, grav) {

        this.position = new Vector(x, y);

        this.velocity = new Vector(0.0, 0.00001);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);

        this.bearing = new Vector(0.0, 0.0);
        this.bearing.setAngle(direction);

        this.acceleration = new Vector(0.0, 0.0); // criar vector thrust inicialmente sem valores, mas que ira mudar com o mouse
        this.acceleration.setLength(0.0001);
        this.acceleration.setAngle(direction);

        this.gravity = new Vector(0.0, grav || 0.00001);
    
        this.color = utils.getRandomColorHEX(); // atribuir uma propriedade Color a novas Particles

        this.turningLeft = false;
        this.turningRight = false;
        this.thrusting = false;

        this.friction = 1;

        this.radius = 10;
    };


    accelerate () {
        if (this.thrusting == true) {
            this.acceleration.setLength(0.1);
        }
        else {
            this.acceleration.setLength(0.00001);
        };
        if (this.turningLeft == true) {
            this.acceleration.setAngle(this.acceleration.getAngle() - 0.05);
            this.bearing.setAngle(this.bearing.getAngle() - 0.05);
        };
        if (this.turningRight == true) {
            this.acceleration.setAngle(this.acceleration.getAngle() + 0.05);
            this.bearing.setAngle(this.bearing.getAngle() + 0.05);
        };
    };

    
    update() {
        this.position.addTo(this.velocity);
        this.velocity.addTo(this.gravity);
        this.velocity.multiplyBy(this.friction);
        this.velocity.addTo(this.acceleration);
    };

    
    edge() {
        if (this.position.getX() > width) {
            this.position.setX(0);
        };
        if (this.position.getX() < 0) {
            this.position.setX(width);
        };
        if (this.position.getY() > heigth) {
            this.position.setY(0);
        };
        if (this.position.getY() < 0) {
            this.position.setY(heigth);
        };
    };
    

    draw () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.getX(), this.position.getY(),this.radius, 0,Math.PI*2);
        context.stroke();
        context.fill();
        context.closePath();
    };

};