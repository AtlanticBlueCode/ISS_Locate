"use strict"

var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d");

var canvasPista = document.getElementById("canvasPista"),
	contextPista = canvasPista.getContext("2d");

var width = canvas.width = canvasPista.width = window.innerWidth,
	heigth = canvas.height = canvasPista.height = window.innerHeight;


var Player;

var DataOn = false;

var	GameStartKey = false; // Jogo apenas se inicia quando é tocada a primeira tecla
var	GameOver = false;
var	GameWrapUp = false;

var	ScoreLogged = false;

var	Car_A = new car(297, 100, 0, Math.PI*2-0.05 , 0, "Red");
var	Car_B = new car(301, 135, 0, Math.PI*2-0.05 , 0, "Green");

var	Score = 0;

/*
var Cones = [];
var MaxCones = 30;
for (var i = 0; i < MaxCones; i++ ){
	Cones.push(new Cone(Math.random() * width, Math.random() * heigth,0 ));
}
*/

// Criar event listeners no document.body para "keydown" e "keyup" que chamam funcoes "keyDown" e "keyUp"
document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

drawTrack();

// Iniciar o game loop
loop();

// Game loop
function loop() {

	// Desenhar fundo
//    context.fillStyle = 'rgba(255, 255, 255	,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
//    context.fillRect(0, 0,width, heigth); //limpar bem zona de dados  
	context.clearRect(0, 0,width, heigth); //limpar bem zona de dados  

	
	// Mostrar stats do jogo
	if (DataOn) {
		showData()
	};

/*	
    for (var i = 0; i <Cones.length; i++) {
        Cones[i].draw();
    };
*/

		Car_A.offtrack();
		Car_B.offtrack();

	if (Car_A.crashed == false&& Car_B.crashed==false) {
		Car_A.accelerate();
		Car_A.update(); //actualizar vector de posicao e movimento
		//	Car_A.hitCone();
		Car_A.edge();
		Car_A.draw();

		Car_B.accelerate();
		Car_B.update(); //actualizar vector de posicao e movimento
		//	Car_B.hitCone();
		Car_B.edge();
		Car_B.draw();
	} else if (Car_A.crashed == true) {
		GameOver = true;
		drawExplosion(Car_A.position.getX(),Car_A.position.getY())
	} else if (Car_B.crashed == true) {
		GameOver = true;
		drawExplosion(Car_B.position.getX(),Car_B.position.getY())
	}

	if (GameOver ==! true || GameWrapUp ==! true) { requestAnimationFrame(loop) }; //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame

};
