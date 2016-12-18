
"use strict"

var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;


var food = function () {
    this.membersNormal = [];
    this.likelihoodNormal = 1 / 100;

    this.membersRare = [];
    this.likelihoodRare = 1 / 400;

    this.membersEpic = [];
    this.likelihoodEpic = 1 / 1200;

    this.draw = function () {

        for (var i = this.membersNormal.length - 1; i >= 0; i--) {
            context.beginPath();
            context.fillStyle = this.membersNormal[i].cor;
            context.strokeStyle = "black";
            context.arc(this.membersNormal[i].posicaoX, this.membersNormal[i].posicaoY, this.membersNormal[i].radius, 0, Math.PI * 2, false);
            context.fill();
            context.stroke();
        };

        for (var i = this.membersRare.length - 1; i >= 0; i--) {
            context.beginPath();
            context.fillStyle = this.membersRare[i].cor;
            context.strokeStyle = "black";
            context.arc(this.membersRare[i].posicaoX, this.membersRare[i].posicaoY, this.membersRare[i].radius, 0, Math.PI * 2, false);
            context.fill();
            context.stroke();
        };

        for (var i = this.membersEpic.length - 1; i >= 0; i--) {
            context.beginPath();
            context.fillStyle = this.membersEpic[i].cor;
            context.strokeStyle = "black";
            context.arc(this.membersEpic[i].posicaoX, this.membersEpic[i].posicaoY, this.membersEpic[i].radius, 0, Math.PI * 2, false);
            context.fill();
            context.stroke();
        };

    };

    this.grow = function () {
        if (this.membersNormal.length + this.membersRare.length  < 250) {

            if (Math.random() > 1 - this.likelihoodNormal) {

                var newNormalFoodPiece = new foodPiecesNormal(
                    (Math.random() * 0.95 + 0.025) * width,
                    (Math.random() * 0.95 + 0.025) * height,
                    utils.getRandomColorRGB(0, 1, 0));

                this.membersNormal.push(newNormalFoodPiece);
            }
            else if (Math.random() > 1 - this.likelihoodRare) {
            
                var newRareFoodPiece = new foodPiecesRare(
                    (Math.random() * 0.95 + 0.025) * width,
                    (Math.random() * 0.95 + 0.025) * height,
                    utils.getRandomColorRGB(0, 0, 1));

                this.membersRare.push(newRareFoodPiece);
            }
            else if (Math.random() > 1 - this.likelihoodEpic) {
            
                var newEpicFoodPiece = new foodPiecesEpic(
                    (Math.random() * 0.95 + 0.025) * width,
                    (Math.random() * 0.95 + 0.025) * height,
                    utils.getRandomColorRGB(1, 0, 0));

                this.membersEpic.push(newEpicFoodPiece);
            };
        };
    };

    this.reset = function () {
        this.membersNormal = [];
        this.membersRare = [];
    };
};

var foodPiecesNormal = function (posicaoX, posicaoY, cor) {
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
    this.cor = cor;
    this.growthValue = 1;
    this.radius = 5;
};

var foodPiecesRare = function (posicaoX, posicaoY, cor) {
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
    this.cor = cor;
    this.growthValue = 5;
    this.radius = 8;
};

var foodPiecesEpic = function (posicaoX, posicaoY, cor) {
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
    this.cor = cor;
    this.growthValue = 15;
    this.radius = 12;
};


var snakes = function () {
    this.members = [];

    this.addSnake = function (name, corBase) {
        var newSnake = new snake(name, corBase);
        newSnake.spawn();
        this.members.push(newSnake);
    };
};

var snake = function (name, corBase) {
    this.members = [];
    this.name = name;
    this.corBase = corBase;
    this.score = 0;
    this.dead = false;
    this.radius = 10;

    this.spawn = function () {
        var newHead = new snakeScales((Math.random() * 0.8 + 0.1) * width, (Math.random() * 0.8 + 0.1) * height,this.radius);
        this.members.push(newHead);
    };

    this.draw = function () {
        for (var i = this.members.length - 1; i >= 0; i--) {
            context.beginPath();
            context.fillStyle = this.members[i].cor;
            context.strokeStyle = "black";
            context.arc(this.members[i].posicaoX, this.members[i].posicaoY, this.radius, 0, Math.PI * 2, false);
            context.fill();
            context.stroke();
        };

        context.font = '10px Calibri';
        context.fillText(
            this.name,
            this.members[0].posicaoX + this.members[0].velocidadeX + (this.members[0].velocidadeX >= 0 ? this.radius : (-this.radius - context.measureText(this.name).width)),
            this.members[0].posicaoY + this.members[0].velocidadeY + (this.members[0].velocidadeY >= 0 ? this.radius + 6 : (-this.radius)));
    };

    this.grow = function () {
        var newTail = new snakeScales(
            this.members[this.members.length - 1].posicaoX - this.members[this.members.length - 1].velocidadeX,
            this.members[this.members.length - 1].posicaoY - this.members[this.members.length - 1].velocidadeY);
        this.members.push(newTail);
        this.radius = this.members.length * 0.2*0 + 10;      //Aumentar raio da snake à medida que cresce
    };

    this.move = function () {
        if (this.members.length > 1) {
            for (var i = this.members.length - 1; i > 0; i--) {
                this.members[i].velocidadeX = this.members[i - 1].velocidadeX;
                this.members[i].velocidadeY = this.members[i - 1].velocidadeY;
                this.members[i].move();
            };
        };
        this.members[0].move();
    };

    this.color = function () {
        for (var i = this.members.length - 1; i >= 0; i--) {
            this.members[i].cor = 'rgb('
                + (this.corBase === "red" ? 1 : 0) * Math.floor((1 - this.members.indexOf(this.members[i]) / this.members.length) * 255 * 3 / 4 + 255 * 1 / 4) + ','
                + (this.corBase === "green" ? 1 : 0) * Math.floor((1 - this.members.indexOf(this.members[i]) / this.members.length) * 255 * 3 / 4 + 255 * 1 / 4) + ','
                + (this.corBase === "blue" ? 1 : 0) * Math.floor((1 - this.members.indexOf(this.members[i]) / this.members.length) * 255 * 3 / 4 + 255 * 1 / 4) + ')';

            // Algoritmo para cor arco iris
            /*
            this.members[i].cor = 'rgb('
                + Math.floor((1 - this.members.indexOf(this.members[i]) / this.members.length) * 255 * 3 / 4 + 255 * 1 / 4) + ','
                + Math.floor((1 - this.members.indexOf(this.members[i]) / this.members.length) * 255 * 3 / 4 + 255 * 1 / 4) + ','
                + Math.floor((this.members.indexOf(this.members[i]) / this.members.length) * 255 * 3 / 4 + 255 * 1 / 4) + ')';
            */
        };
    };

    this.eat = function () {
        for (var i = 0; i < food.membersNormal.length; i++) {
            if (
                Math.abs(this.members[0].posicaoX - food.membersNormal[i].posicaoX) <= this.radius + food.membersNormal[i].radius &&
                Math.abs(this.members[0].posicaoY - food.membersNormal[i].posicaoY) <= this.radius + food.membersNormal[i].radius
            ) {
                for (var j = 1; j <= food.membersNormal[i].growthValue; j++) {
                    this.grow();
                };
                food.membersNormal.splice(i, 1);
            };
        };

        for (var i = 0; i < food.membersRare.length; i++) {
            if (
                Math.abs(this.members[0].posicaoX - food.membersRare[i].posicaoX) <= this.radius + food.membersRare[i].radius &&
                Math.abs(this.members[0].posicaoY - food.membersRare[i].posicaoY) <= this.radius + food.membersRare[i].radius
            ) {
                for (var j = 1; j <= food.membersRare[i].growthValue; j++) {
                    this.grow();
                };    
                food.membersRare.splice(i, 1);
            };
        };

        for (var i = 0; i < food.membersEpic.length; i++) {
            if (
                Math.abs(this.members[0].posicaoX - food.membersEpic[i].posicaoX) <= this.radius + food.membersEpic[i].radius &&
                Math.abs(this.members[0].posicaoY - food.membersEpic[i].posicaoY) <= this.radius + food.membersEpic[i].radius
            ) {
                for (var j = 1; j <= food.membersEpic[i].growthValue; j++) {
                    this.grow();
                };    
                food.membersEpic.splice(i, 1);
            };
        };
        
    };

    this.crash = function () {
        for (var i = 0; i < snakes.members.length; i++) {
            if (this != snakes.members[i]) {
                for (var j = 0; j < snakes.members[i].members.length; j++) {
                    if (
                        Math.abs(this.members[0].posicaoX - snakes.members[i].members[j].posicaoX) <= this.radius + snakes.members[i].radius &&
                        Math.abs(this.members[0].posicaoY - snakes.members[i].members[j].posicaoY) <= this.radius + snakes.members[i].radius
                    ) {
                        this.dead = true;
                        snakes.members[i].score++;
                        return;     //essencial para o For parar logo e não adicionar varias vezes o score++ se houver impacto com varias scales
                    };
                };
            };
        };
    };
    
    this.edge = function () {         // Evitar que a Snake saia do ecra voltando a coloca-la no outro lado quando sair
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].posicaoX > width + this.radius) {
                this.members[i].posicaoX = 0 - this.radius;
            }
            if (this.members[i].posicaoX < 0 - this.radius) {
                this.members[i].posicaoX = width + this.radius;
            }
            if (this.members[i].posicaoY > height + this.radius) {
                this.members[i].posicaoY = 0 - this.radius;
            }
            if (this.members[i].posicaoY < 0 - this.radius) {
                this.members[i].posicaoY = height + this.radius;
            };
        };
    };

    this.reset = function () {
        this.members = [];
        this.radius = 10;
        this.spawn();
        this.dead = false;
    };
};


var snakeScales = function (posicaoX, posicaoY, radius) {
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.aceleracaoX = 0;
    this.aceleracaoY = 0;
    this.gravidadeY = 0;
    this.cor = null;
    this.radius = radius;
    this.velocidadeMax = 10;

    this.move = function () {
        this.velocidadeX = this.velocidadeX + this.aceleracaoX;
        this.velocidadeY = this.velocidadeY + this.aceleracaoY;

        if (Math.abs(this.velocidadeX) > this.velocidadeMax) {      // limite de velocidade X
            if (this.velocidadeX >= 0)
            { this.velocidadeX = this.velocidadeMax }
            else
            { this.velocidadeX = - this.velocidadeMax }
        };

        if (Math.abs(this.velocidadeY) > this.velocidadeMax) {      // limite de velocidade Y
            if (this.velocidadeY >= 0)
            { this.velocidadeY = this.velocidadeMax }
            else
            { this.velocidadeY = - this.velocidadeMax }
        };

        this.posicaoX = this.posicaoX + this.velocidadeX;
        this.posicaoY = this.posicaoY + this.velocidadeY;
    };
};


var snakes = new snakes();
var food = new food();


var num_snakes = null;

function initialSetup() {
    num_snakes = parseFloat(prompt("Quantas Snakes (1 ou 2)?"));
    switch (num_snakes) {
        case 1:
            var nameSnake_1 = prompt("Indica o nome da Snake 1?") || "Snake_1";
            var corSnake_1 = prompt("Indica a cor da Snake 1 (red, green, blue)?") || "green";
            var Snake_1 = snakes.addSnake(nameSnake_1, corSnake_1);
            break;

        case 2:
            var nameSnake_1 = prompt("Indica o nome da Snake 1?") || "Snake_1";
            var corSnake_1 = prompt("Indica a cor da Snake 1 (red, green, blue)?") || "red";
            var Snake_1 = snakes.addSnake(nameSnake_1, corSnake_1);

            var nameSnake_2 = prompt("Indica o nome da Snake 2?") || "Snake_2";
            var corSnake_2 = prompt("Indica a cor da Snake 2 (red, green, blue)?") || "blue";
            var Snake_2 = snakes.addSnake(nameSnake_2, corSnake_2);
            break;

        default:
            initialSetup();
            break;        
    };  
};


function clearScreen() {                                    // Limpeza de ecra
    context.fillStyle = 'rgba(255, 255, 255,1)';            // para criar efeito fade pinto todo o canvas deixando um opacity 0.15
    context.fillRect(0, 0, canvas.width, canvas.height);    //limpar o canvas todo no inicio da nova frame
};

function showData() {
    context.fillStyle = 'rgba(255, 255, 255,1)';            // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(0, 0, 200, 180);                       // limpar bem zona de dados

    context.fillStyle = 'black';                            // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.font = '10px Calibri';

    context.fillText("Food Pieces Normal: " + food.membersNormal.length, 0, 30);
    context.fillText("Food Pieces Rare: " + food.membersRare.length, 0, 40);

    for (var i = 0; i < snakes.members.length; i++){
        context.fillText("Snake "+(i+1)+" Name: " + snakes.members[i].name, 0, 60+i*10);
        context.fillText("Snake "+(i+1)+" Cor Base: " + snakes.members[i].corBase, 0, 90+i*10);
        context.fillText("Snake "+(i+1)+" Length: " + snakes.members[i].members.length, 0, 120+i*10);
        context.fillText("Snake "+(i+1)+" Score: " + snakes.members[i].score, 0, 150+i*10);
    };
};


initialSetup();

loop(); //necessario chamar a funcao pela primeira vez, fora da propria funcao

function loop() {

    clearScreen();

    showData();

    food.grow();

    food.draw();

    for (var i = 0; i < snakes.members.length; i++){
        if (snakes.members[i].dead != true) {

            snakes.members[i].color();
            snakes.members[i].move();
            snakes.members[i].edge();
            snakes.members[i].crash();
            snakes.members[i].eat();
            snakes.members[i].draw();
        }
        else {
            context.font = '40px Calibri';
            context.fillStyle = snakes.members[i].corBase;
            context.fillText("Bye Bye " + snakes.members[i].name+"!!!", 120, 40);
            snakes.members[i].reset();
        };
    };

    requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
};


// criar event listener para tecla down
document.body.addEventListener("keydown", function (event) {
    console.log(event.keyCode); // truque para logar para a consola o codigo da trecla que se carrega
    switch (event.keyCode) {
        case 38: //up
            snakes.members[0].members[0].aceleracaoY = - 0.2;
            break;
        case 40: //down
            snakes.members[0].members[0].aceleracaoY = + 0.2;
            break;
        case 37: //left
            snakes.members[0].members[0].aceleracaoX = - 0.2;
            break;
        case 39: //right
            snakes.members[0].members[0].aceleracaoX = + 0.2;
            break;
        case 32: //space
            snakes.members[0].grow();
            break;

        case 87: //up
            snakes.members[1].members[0].aceleracaoY = - 0.2;
            break;
        case 83: //down
            snakes.members[1].members[0].aceleracaoY = + 0.2;
            break;
        case 65: //left
            snakes.members[1].members[0].aceleracaoX = - 0.2;
            break;
        case 68: //right
            snakes.members[1].members[0].aceleracaoX = + 0.2;
            break;
            
        default:
            break;
    }
});

// criar event listener para tecla up
// define o que acontece ao thrust se tecla deixar de ser carregada
// sem este passo o thrust continuaria para sempre com valor que tinha quando deixei de carregar na tecla 
document.body.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 38: //up
            snakes.members[0].members[0].aceleracaoY = 0;
            break;
        case 40: //down
            snakes.members[0].members[0].aceleracaoY = 0;
            break;
        case 37: //left
            snakes.members[0].members[0].aceleracaoX = 0;
            break;
        case 39: //right
            snakes.members[0].members[0].aceleracaoX = 0;
            break;

        case 87: //up
            snakes.members[1].members[0].aceleracaoY = 0;
            break;
        case 83: //down
            snakes.members[1].members[0].aceleracaoY = 0;
            break;
        case 65: //left
            snakes.members[1].members[0].aceleracaoX = 0;
            break;
        case 68: //right
            snakes.members[1].members[0].aceleracaoX = 0;
            break;

        default:
            break;
    }
});

/*
IDEIAS DE DESENVOLVIMENTO

Contra-Relogio
Haver um cronometro
O jogo gera aleatoriamente 25 bolas logo no inicio
Ver quem faz o melhor tempo para as comer todas mais depressa

Um contra Um para Comer
Duas cobras
Vao aparecendo comidas que fazem crescer
Ver quem come primeiro 25 comidas


Um contra Um para Matar
Duas cobras
Vao aparecendo comidas que fazem crescer
Ver quem mata primeiro o adversario

Niveis
Uma cobra tenta comer 25 comidas
Mas em cada nivel ha mais obstaculos (tipo paredes) em que se bater morre

Extras
Haver comidas p.e.
- que tiram 5 de tamanho (se tamanho <0 morres)
- que matam instantaneamente

Crescer significa
- mais comprido
- mas também mais gordo

*/

