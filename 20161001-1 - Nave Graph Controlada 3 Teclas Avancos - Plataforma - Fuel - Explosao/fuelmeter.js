
var fuelMeter = {
    nivel: 300,
    cor: "red",
    largura: 20,
    altura: null,
    posicaoX: width-40,
    posicaoY: 100,
    create: function () {
        fuelMeter.altura = height/10*fuelMeter.nivel/300 
    },

    update: function () {
        if (fuelMeter.nivel <= 0) {
            noFuel = true;
            fuelMeter.nivel = 0.0000001;
        };
        fuelMeter.altura = height/10*fuelMeter.nivel/300 
    },

    draw: function () {
        context.beginPath();
        context.rect(fuelMeter.posicaoX, fuelMeter.posicaoY, fuelMeter.largura,-height/10 );
        context.fillStyle = "darkred";
        context.fill();
        context.closePath();

        context.beginPath();
        context.rect(fuelMeter.posicaoX, fuelMeter.posicaoY, fuelMeter.largura,-fuelMeter.altura);
        context.fillStyle = fuelMeter.cor;
        context.fill();
        context.closePath();
        
        context.fillStyle = 'red';
        context.fillText(Math.floor(fuelMeter.nivel/300 * 100) +"%", fuelMeter.posicaoX-35, fuelMeter.posicaoY-height/10/2);

    },
};