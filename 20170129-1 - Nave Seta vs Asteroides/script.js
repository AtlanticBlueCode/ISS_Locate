"use strict"


/*  PROXIMOS DESENVOLVIMENTOS
    
    - Medir a capacidade para disparar novos tiros por Laser Overheat/Chill
    - Dois Ships em modo Cooperativo ou Competitivo (quem mata mais Asteroids e está vivo no fim)
    - Por o jogo no Site
    - Registo de Highscores na Web (Nome, Data, Score, País... Ranked) com Firebase
    - Menu Inicial com acesso aos Highscores
    - Nave mais cool
    - Power Ups
        - aparecem
            - aleatoriamente ou
            - quando se destroi o Nth Asteroides
            - quando se destroi asteroi especial
        - dão
            - mais shots seguidas
            - mais velocidade max da Nave
            - mais Maneuverability da Nave
            - arma especial mais potente
            - shield para N hits
    - Arma especial para a Nave
        - tipo bomba com raio 50
        - carrgea-se em A para lançar e outra vez A para explodir e eliminar Asteroids no raio de explosao
    - Vários Níveis em que se mantém Game Engine mas pioram parâmetros
        - # Asteroides
        - Velocidade Asteroides
        - Overheating/Chill Speed do Laser
        - Asteroides Especiais (com border e outra cor)
            - que precisam de levar 2/3/n tiros para explodir
            - que largam Power Ups
        - Velocidade da Nave
        - Maneuverability da Nave
        - # Fragmentos dos Asteroides quando destruidos (podem ser 2, 3, 4, etc...)
        - Tamanho em que os Asteroids deixam de se partir e desaparcem (se mais pequeno, mais dificil)
        - ........

*/


var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    heigth = canvas.height = window.innerHeight;


var GameStart = false; // Jogo apenas se inicia quando é tocada a primeira tecla
var GameOver = false;
var GameWrapUp = false;
var ScoreLogged = false;

var Ship_A = new ship(width / 2, heigth / 2, 0, Math.PI * 1.5, 0);

var Asteroids = [];
var HighLiveAsteroids = 0;
var InitialLiveAsteroids = 10;
var AsteroidsGenerated = InitialLiveAsteroids;
for (var i = 0; i < InitialLiveAsteroids; i++) {
    Asteroids.push(new asteroid());
};

var Lasers = [];
var MaxLiveLasers = 1;
var LasersFiredCount = 0;
var LaserFired = false;

var Missiles = [];
var MaxLiveMissiles = 1;
var MissilesFiredCount = 0;
var MissileFired = false;
var MissileDetonated = false;

var Powerups = [];

var Score = 0;

var Player = prompt("Nome ?");


function clearScreen() {                         // Limpeza de ecra para rendering    
    context.fillStyle = 'rgba(255, 255, 255,1)'; // para criar efeito fade pinto todo o canvas deixando um opacity 0.15
    context.fillRect(0, 0, canvas.width, canvas.height); //limpar o canvas todo no inicio da nova frame
};


loop();

function loop() {

    clearScreen();
    showData();

    if (Asteroids.length == 0) {
        GameOver = true;
        GameWrapUp = true;
        console.log("Ganhaste!")
    };
    
    if (MissileFired == true && Missiles.length < MaxLiveMissiles) {
        Missiles.push(new missile(Ship_A.position.getX(), Ship_A.position.getY(), Ship_A.maxVelocity * 0.25, Ship_A.bearing.getAngle()));
        MissilesFiredCount++;
    };

    for (var i = Missiles.length - 1; i >= 0; i--) {
        Missiles[i].update();
        Missiles[i].draw();
        if (Missiles[i].position.getX() > width ||
            Missiles[i].position.getX() < 0 ||
            Missiles[i].position.getY() > heigth ||
            Missiles[i].position.getY() < 0) {
            Missiles.splice(i, 1);
            break;
        };
        if (MissileDetonated == true) {
            for (var j = Asteroids.length - 1; j >= 0; j--) {
                if (Missiles[i].hitCheck(Asteroids[j])) {
                    Asteroids.splice(j, 1);
                    Score++;
                };
            };
            Missiles.splice(i, Missiles.length);
        };
    };


    if (LaserFired == true && Lasers.length < MaxLiveLasers) {
        Lasers.push(new laser(Ship_A.position.getX(), Ship_A.position.getY(), Ship_A.maxVelocity * 1.5, Ship_A.bearing.getAngle()));
        LasersFiredCount++;
    };

    // avançar os Lasers ja existentes, desenha-los e ver se atingem alvos   
    for (var i = Lasers.length - 1; i >= 0; i--) {
        Lasers[i].update();
        Lasers[i].draw();
        if (Lasers[i].position.getX() > width ||
            Lasers[i].position.getX() < 0 ||
            Lasers[i].position.getY() > heigth ||
            Lasers[i].position.getY() < 0) {
            Lasers.splice(i, 1);
            break;
        };
        for (var j = Asteroids.length - 1; j >= 0; j--) {
            if (GameOver!== true && Lasers[i].hitCheck(Asteroids[j])) {
                Lasers.splice(i, Lasers.length);
                Score++;
                if (Score == 5) {
                    Powerups.push(new powerup(Asteroids[j].position.getX(), Asteroids[j].position.getY(), "base"));
                    Score += 0.00001
                };
                if (Asteroids[j].radius >= 14) { Asteroids[j].break(); }
                Asteroids.splice(j, 1);
                break;
            };
        };
    };
    
    for (var i = 0; i < Powerups.length; i++) {
        Powerups[i].draw();
    };

    for (var i = 0; i < Asteroids.length; i++) {
        Asteroids[i].update();
        Asteroids[i].edge();
        Asteroids[i].draw();
    };

    if (Asteroids.length > HighLiveAsteroids) { HighLiveAsteroids = Asteroids.length };   
    
    if (Ship_A.hit !== true) {
        Ship_A.accelerate();
        Ship_A.update(); //actualizar vector de posicao e movimento
        Ship_A.edge();
        Ship_A.draw();
        Ship_A.powerup();
        Ship_A.collision();
    }
    else if (Ship_A.hit == true) {
        GameOver = true;
        drawExplosionShip();
    };

    if (GameOver == true && ScoreLogged == false) {
        writePlayerScore(Player, Math.floor(Score));     // Função para fazer registo na BD
        ScoreLogged = true;
    };

    if (GameOver == true && ScoreLogged == true) {
        displayScores();
    };
    
    if (GameWrapUp !== true) {
        requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
    }
};

// criar event listener para tecla down
// em funcao da tecla carregada ira alterar o vector thrust
// up dá length thrust
// esq e dir altera angle do thrust
document.body.addEventListener("keydown", function (event) {
    GameStart = true; // Jogo apenas começa (nava pode ser atingida) após ser tocada a primeira tecla
    console.log(event.keyCode); // truque para logar para a consola o codigo da tecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            Ship_A.thrusting = true;
            break;
        case 37: //left
            Ship_A.turningLeft = true;
            break;
        case 39: //right
            Ship_A.turningRight = true;
            break;
        case 32: //spacebar
            LaserFired = true;
            break;
        case 17: //Right Ctrl
            if (Missiles.length == 0) { MissileFired = true } else { MissileDetonated = true };
            break;
        default:
            break;
    }
});

// criar event listener para tecla up
// define o que acontece ao thrust se tecla deixar de ser carregada
// sem este passo o thrust continuaria para sempre com valor que tinha quando deixei de carregar na tecla 
document.body.addEventListener("keyup", function (event) {
    //    console.log(event.keyCode); // truque para logar para a consola o codigo da trecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            Ship_A.thrusting = false;
            break;
        case 37: //left
            Ship_A.turningLeft = false;
            break;
        case 39: //right
            Ship_A.turningRight = false;
            break;
        case 32: //spacebar
            LaserFired = false;
            break;
        case 17: //Right Ctrl
            MissileFired = false;
            MissileDetonated = false;
            break;
        default:
            break;
    }
});

