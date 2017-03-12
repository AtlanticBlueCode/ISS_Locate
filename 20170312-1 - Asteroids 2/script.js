"use strict"

var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
	heigth = canvas.height = window.innerHeight;

// definir todas as variáveis do jogo para que possam ser reset em caso de restart
var GameStartKey;
var GameOver;
var GameWrapUp;

var ScoreLogged;
var Score;

var Ship_A;

var Asteroids;
var HighLiveAsteroids;
var InitialLiveAsteroids;
var AsteroidsGenerated;
	
var Lasers;
var MaxLiveLasers;
var LasersFiredCount;
var LaserFired;

var Missiles;
var MaxLiveMissiles;
var MissilesFiredCount;
var MissileFired;
var MissileDetonated;

var Powerups;

var Player;

var DataOn = false;

// Definir valores de partida para inicio de novo jogo das variáveis base
function initialize() {		

	GameStartKey = false; // Jogo apenas se inicia quando é tocada a primeira tecla
	GameOver = false;
	GameWrapUp = false;

	ScoreLogged = false;

	Ship_A = new ship(width / 2, heigth / 2, 0, Math.PI * 1.5, 0);

	Asteroids = [];
	HighLiveAsteroids = 0;
	InitialLiveAsteroids = 10;
	AsteroidsGenerated = InitialLiveAsteroids;
	for (var i = 0; i < InitialLiveAsteroids; i++) {
		Asteroids.push(new asteroid());
	};

	Lasers = [];
	MaxLiveLasers = 2;
	LasersFiredCount = 0;
	LaserFired = false;

	Missiles = [];
	MaxLiveMissiles = 1;
	MissilesFiredCount = 0;
	MissileFired = false;
	MissileDetonated = false;

	Powerups = [];

	Score = 0;
}


// Criar event listeners no document.body para "keydown" e "keyup" que chamam funcoes "keyDown" e "keyUp"
document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

// Obter os valores preenchidos no form do menu inicial
// Criar event listeners para mouse click ou tecla enter nos menus iniciais
// Avançar para start() quando se pressiona Enter ou clica
var NameText = document.getElementById("PlayerNameText");
NameText.addEventListener("keydown", function (event) { if (event.keyCode == 13) { start() } });
var NameButton = document.getElementById("PlayerNameButton");
NameButton.addEventListener("click", start);

// Iniciar jogo novo
function start() {
	// Registar o nome do Player
	Player = NameText.value;

	//Limpar o form de introdução do nome - se não o eliminarmos a página acelera incontrolavelmente !
	NameText.parentNode.removeChild(NameText);
	NameButton.parentNode.removeChild(NameButton);
	
	// Jogo apenas se inicia quando é tocada a primeira tecla
	// Necessário timeout para esmagar o registo de tecla down caso se feche o form do nome com enter
	setTimeout(function () { GameStartKey = false },1);

	// Inicializar as variavéis base de jogo novo
	initialize();

	// Iniciar o game loop
	loop();
}

// Game loop
function loop() {

	// Desenhar fundo
	drawStarfield();

	// Mostrar stats do jogo
	if (DataOn) {
		showData()
	};

	// Acabar jogo se todos os Asteroides destruidos
	// Importante ser antes do draw Lasers para que já não sejam desenhados
	if (Asteroids.length == 0) {
		GameOver = true;
		GameWrapUp = true;
		console.log("Ganhaste!")
	};

	// Disparar novo Missile de possível	
	if (MissileFired == true && Missiles.length < MaxLiveMissiles) {
		Missiles.push(new missile(Ship_A.position.getX(), Ship_A.position.getY(), Ship_A.maxVelocity * 0.25, Ship_A.bearing.getAngle()));
		MissilesFiredCount++;
	};

	// Avançar os Missiles ja existentes, desenha-los, ver se atingem alvos e tratar conseequencias
	for (var i = Missiles.length - 1; i >= 0; i--) {
		Missiles[i].update();
		Missiles[i].draw();
		if (Missiles[i].edge() == true) {Missiles.splice(i, 1) };
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

	// Disparar novo Laser se possível
	if (LaserFired == true && Lasers.length < MaxLiveLasers) {
		Lasers.push(new laser(Ship_A.position.getX(), Ship_A.position.getY(), Ship_A.maxVelocity * 1.5, Ship_A.bearing.getAngle()));
		LasersFiredCount++;
	};

	// Avançar os Lasers ja existentes, desenha-los, ver se atingem alvos e tratar conseequencias   
	for (var i = Lasers.length - 1; i >= 0; i--) {
		Lasers[i].update();
		Lasers[i].draw();
		if (Lasers[i].edge() == true) {
			Lasers.splice(i, 1);
			break;
		};
		for (var j = Asteroids.length - 1; j >= 0; j--) {
			if (GameOver !== true && Lasers[i].hitCheck(Asteroids[j])) {
				Lasers.splice(i, Lasers.length);
				Score++;
				if (Score == 200) {
					Powerups.push(new powerup(Asteroids[j].position.getX(), Asteroids[j].position.getY(), "base"));
					Score += 0.00001
				};
				if (Asteroids[j].radius >= 14) {
					Asteroids[j].break();
				}
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

	if (Asteroids.length > HighLiveAsteroids) {
		HighLiveAsteroids = Asteroids.length
	};

	if (Ship_A.hit !== true) {
		Ship_A.accelerate();
		Ship_A.update(); //actualizar vector de posicao e movimento
		Ship_A.edge();
		Ship_A.draw();
		Ship_A.powerup();
		Ship_A.collision();
	} else if (Ship_A.hit == true) {
		GameOver = true;
		drawExplosionShip();
	};

	if (GameOver == true && ScoreLogged == false) {
		writePlayerScore(Player, Math.floor(Score)); // Função para fazer registo na BD
		ScoreLogged = true;
	};

	if (GameOver == true && ScoreLogged == true && GameWrapUp == true) {
		displayScores();
		setTimeout(restart, 1000);
	} else {
		requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
	};
};

function restart() {
	var Restart = prompt("Restart?");
	if (Restart==="s" ||Restart==="sim" ||Restart==="yes" || Restart==="y" || Restart==="true") {
		initialize();
		loop();
	}
	else {
		console.log("See you soon!")
		context.font = "30px Arial";
		context.fillText("Game Over", width/2-context.measureText("Game Over").width/2, heigth/2-20);
		context.font = "15px Arial";
		context.fillText("Press F5 to Restart", width/2-context.measureText("Press F5 to Restart").width/2, heigth/2+20);
	}
}