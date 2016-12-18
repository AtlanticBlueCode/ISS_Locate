
// Desenhar Nave

var shipImage = new Image(); // Cria nova Imagem
shipImage.src = "Assets/shuttle/shuttle-transp_LightBlue.png"; // Define ficheiro fonte para a Imagem
shipImage.height = 256;

function drawShip() {
    context.drawImage( // Desenhar frame da sprite sheet
        shipImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        shipImage.width, shipImage.height, // Largura e Altura da frame a recortar
        -shipImage.width / 6 / 2, -shipImage.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        shipImage.width / 6, shipImage.height / 6 // Largura e Altura da frame a desenhar
    );
};



// Desenhar Thrusters

var flameImage = new Image(); // Cria nova Imagem
flameImage.src = "Assets/thruster fire/Fire.png"; // Define ficheiro fonte para a Imagem

function drawThrusters() {
    // small left thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        -8, shipImage.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 15 // Largura e Altura da frame a desenhar
    );

    // small rigth thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        5, shipImage.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 15 // Largura e Altura da frame a desenhar
    );

    // large middle thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        -1, shipImage.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 8 // Largura e Altura da frame a desenhar
    );
}



// Desenhar Explosão

var explosionImage = new Image(); // Cria nova Imagem
explosionImage.src = "Assets/explosion/Sprite Sheet/ExplosionA1.png"; //Vai buscar o ficheiro para esta imagem

var sprite = {
    countFrame: 0, // Contador de frames passadas
    partialFrame: 0, // Contador de sub frames do browser para carregar nova frame da sprite sheet
    thisFrameX: 0, // Coordenada x da frame a tirar da sprite sheet
    thisFrameY: 0, // Coordenada y da frame a tirar da sprite sheet
    totalColumns: 32, // Frames por fila da sprite sheet	
    totalRows: 1, // Filas de Frames da sprite sheet
    totalFrames: 32,// Total de frames na sprite sheet
};

function drawExplosion() {

    sprite.thisFrameX = (sprite.countFrame % sprite.totalColumns) * explosionImage.width / sprite.totalColumns; // x definido por countFrame modulus 12 (frames por linha) X width de cada frame
    sprite.thisFrameY = Math.floor(sprite.countFrame / sprite.totalColumns) * explosionImage.height / sprite.totalRows; // y definido por countFrame / 12 (frames por linha) X heigth de cada frame
    
    //apagar toda a zona da explosao
    context.fillStyle = 'rgba(255,255,255,1)';
    context.fillRect(ship.position.getX() - 100, ship.position.getY() - 100, 200, 200);

    //desenhar a explosão
    context.drawImage( // Desenhar frame da sprite sheet
        explosionImage, // Imagem da sprites sheet toda
        sprite.thisFrameX, sprite.thisFrameY, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows, // Largura e Altura da frame a recortar
        ship.position.getX() - 50, ship.position.getY() - 55, // Coordenadas do canto sup esquerdo destino no canvas
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows // Largura e Altura da frame a desenhar
    );

    plataforma.draw();     // desenhar a plataforma de novo (para não desaparecer com a explosão)    

    spriteTimer();         // avançar animação da explosão
};

function spriteTimer() {
    if (sprite.countFrame == sprite.totalFrames - 1) { //conta se já deu a volta toda à sprite sheet
        return;                                            //se sim, acabar a execução do programa
        //        sprite.countFrame = 0;                       //se sim, voltar a correr a sprite sheet do início
    }
    else if (sprite.partialFrame > 1) {
        sprite.countFrame++;                       //avançar para frame seguinte da spreadsheet
        sprite.partialFrame = 0;                   //repor a contagem para passar a frame seguinte
    }
    else {
        sprite.partialFrame += 0.25;               //número de frames da spritesheet que passam por cada refresh do browser
    };
};
