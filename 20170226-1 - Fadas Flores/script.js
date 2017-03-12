"use strict"

var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;


var GameStart = false; // Jogo apenas se inicia quando é tocada a primeira tecla
var GameOver = false;
var GameWrapUp = false;

var dataOn = false;
var Score = 0;
var ScoreLogged = false;

var PowerUpProb = 3 / 1000;
var MaxPowerUps = 15;
var PowerUps = [];

var Fairy_A = new Fairy (width / 2, height-10, 0, Math.PI * 1.5, 0.04);

var numCloudPads = 8;
var CloudPads = [];
for (var i = 0; i <= numCloudPads; i++) {
    CloudPads.push(new CloudPad(width / numCloudPads*0.5 + (width / numCloudPads) * i));
};

var numGrassPatches;
console.log(numGrassPatches)
grassImage.onload = function () {
    numGrassPatches = Math.ceil(width / (grassImage.width *3/4-10));
    console.log(numGrassPatches)
};

var Score = 0;

//var Player = prompt("Nome ?");


loop();

function loop() {

    drawSky();

    if (dataOn) { showData() };
  
    for (var i = 0; i < PowerUps.length; i++) {
        PowerUps[i].draw();
    };

    if (Fairy_A.hit !== true) {
        Fairy_A.accelerate();
        Fairy_A.update(); //actualizar vector de posicao e movimento
        Fairy_A.edge();
        Fairy_A.draw();
        Fairy_A.powerup();
        Fairy_A.land();
    }
    else if (Fairy_A.hit == true) {
        GameOver = true;
//        drawExplosionShip();
    };

    for (var i = 0; i <= numCloudPads; i++) {
        CloudPads[i].draw();
        if (PowerUps.length < MaxPowerUps) { CloudPads[i].seed() };
    };

    
    for (var i = 0, overlap = -10; i < Math.max(5,numGrassPatches); i++) {
        drawGrass(i * grassImage.width *3/4 + overlap);
        overlap += -10;
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

// criar event listeners para "keydown" e "keyup" que chamam funcoes "keyDown" e "keyUp"
document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

