var plataforma = {
    cor: "green",
    largura: 50,
    altura: 10,
    posicaoX: null,
    posicaoY: null,
    create: function () {
        plataforma.posicaoX = Math.random()*(width-50)+25;
        plataforma.posicaoY = height - plataforma.altura;
    },
    draw: function () {
        context.beginPath();
        context.rect(plataforma.posicaoX, plataforma.posicaoY, plataforma.largura, plataforma.altura);
        context.fillStyle = plataforma.cor;
        context.fill();
        context.closePath();
    },
};
