
var setup = function () {

    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;

    ctx.fillStyle = 'red';
    ctx.strokeStyle = '#000000';
    loopTimer = setInterval(loop, frameDelay);
};

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

var frameRate = 1 / 40; // Seconds
var frameDelay = frameRate * 1000; // ms
var loopTimer = false;


/*
 * Experiment with values of mass, radius, restitution,
 * gravity (ag), and density (rho)!
 * 
 * Changing the constants literally changes the environment
 * the ball is in. 
 * 
 * Some settings to try:
 * the moon: ag = 1.6
 * water: rho = 1000, mass 5
 * beach ball: mass 0.05, radius 30
 * lead ball: mass 10, restitution -0.05
 */

var ball = {
    position: { x: width /2, y: 0 },
    velocity: { x: 5, y: 0 },
    mass: 90, //kg
    radius: 20, // 1px = 1cm
    restitution: -0.7,  // Perda de energia em tabelas
    friction:0.995,
};

var Cd = 0.47;  // Coefficient of Drag / Depends on object shape / For a ball its 0.47
var rho = 1.22; // kg / m^3  / Density
var A = Math.PI * ball.radius * ball.radius / (10000); // m^2   // Area da projeccao frontal do objecto
var ag = 9.81;  // m / s^2   Gravity
var mouse = { x: 0, y: 0, isDown: false };

function getMousePosition(e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
};

var mouseDown = function (e) {
    if (e.which == 1) {
        getMousePosition(e);
        mouse.isDown = true;
        ball.position.x = mouse.x;
        ball.position.y = mouse.y;
    };
};

var mouseUp = function (e) {
    if (e.which == 1) {
        mouse.isDown = false;
        ball.velocity.y = (ball.position.y - mouse.y) / 10;
        ball.velocity.x = (ball.position.x - mouse.x) / 10;
    };
};


var loop = function () {
    if (!mouse.isDown) {
        // Do physics
        // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
        var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);

        // Calculate acceleration ( F = ma ) (Force = Mass X Acceleration)
        var ax = Fx / ball.mass;           // Acceleration = Force / Mass
        var ay = ag + (Fy / ball.mass);

        // Integrate to get velocity
        ball.velocity.x = ball.velocity.x*ball.friction + ax * frameRate;
        ball.velocity.y += ay * frameRate;

        // Integrate to get position
        ball.position.x += ball.velocity.x * frameRate * 100;
        ball.position.y += ball.velocity.y * frameRate * 100;
    };

    // Handle collisions
    if (ball.position.y > height - ball.radius) {
        ball.velocity.y *= ball.restitution;
        ball.position.y = height - ball.radius;
    };

    if (ball.position.x > width - ball.radius) {
        ball.velocity.x *= ball.restitution;
        ball.position.x = width - ball.radius;
    };

    if (ball.position.x < 0 + ball.radius) {
        ball.velocity.x *= ball.restitution;
        ball.position.x = 0 + ball.radius;
    };


    // Draw the ball
    ctx.clearRect(0, 0, width, height);

    ctx.save();

    ctx.translate(ball.position.x, ball.position.y);
    ctx.beginPath();
    ctx.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();


    // Draw the slingshot
    if (mouse.isDown) {
        ctx.beginPath();
        ctx.moveTo(ball.position.x, ball.position.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
    };


    // stats
    ctx.fillText("Position X: " + ball.position.x.toFixed(2), 0, 10);
    ctx.fillText("Position Y: " + ball.position.y.toFixed(2), 0, 20);

    ctx.fillText("Velocity X: " + ball.velocity.x.toFixed(2), 0, 40);
    ctx.fillText("Velocity Y: " + ball.velocity.y.toFixed(2), 0, 50);

    ctx.fillText("Acceleration X: " + ax.toFixed(2), 0, 70);
    ctx.fillText("Acceleration Y: " + ay.toFixed(2), 0, 80);


};

setup();