
function endCheck() {

    if (aterragem == true) {
        gameOver = true;
        context.save(); // salvar o canvas
        context.font = '30pt Calibri';
        context.strokeStyle = "green";
        context.fillStyle = "green";
        context.strokeText("Boa Aterragem!",width/10,40);
        context.fillText("Boa Aterragem!", width/10, 40);
        context.restore(); // salvar o canvas
        return;
    };

    if (crash == true) {
        gameOver = true;
        context.save(); // salvar o canvas
        context.font = '30pt Calibri';
        context.fillStyle = "red";
        context.fillText("Crash!",width/10, 40);
        drawExplosion();
        context.restore(); // salvar o canvas
    };

    if (fora == true) {
        gameOver = true;
        context.save(); // salvar o canvas
        context.font = '30pt Calibri';
        context.fillStyle = "blue";
        context.fillText("Nave Perdida!",width/10,40);
        context.restore(); // salvar o canvas
        return;
    };
};
