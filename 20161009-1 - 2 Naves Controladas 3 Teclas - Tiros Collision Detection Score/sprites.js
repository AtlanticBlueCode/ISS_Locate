
// Desenhar Ships

var ship_A_Image = new Image(); // Cria nova Imagem
ship_A_Image.src = "Assets/shuttle/shuttle-transp_LightBlue.png"; // Define ficheiro fonte para a Imagem
ship_A_Image.height = 256;

function drawShip_A() {
    context.drawImage( // Desenhar frame da sprite sheet
        ship_A_Image, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        ship_A_Image.width, ship_A_Image.height, // Largura e Altura da frame a recortar
        -ship_A_Image.width / 6 / 2, -ship_A_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        ship_A_Image.width / 6, ship_A_Image.height / 6 // Largura e Altura da frame a desenhar
    );
};


var ship_B_Image = new Image(); // Cria nova Imagem
ship_B_Image.src = "Assets/shuttle/shuttle-transp_Green.png"; // Define ficheiro fonte para a Imagem
ship_B_Image.height = 256;

function drawShip_B() {
    context.drawImage( // Desenhar frame da sprite sheet
        ship_B_Image, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        ship_B_Image.width, ship_B_Image.height, // Largura e Altura da frame a recortar
        -ship_B_Image.width / 6 / 2, -ship_B_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        ship_B_Image.width / 6, ship_B_Image.height / 6 // Largura e Altura da frame a desenhar
    );
};


// Desenhar Thrusters

var flameImage = new Image(); // Cria nova Imagem
flameImage.src = "Assets/thruster fire/Fire.png"; // Define ficheiro fonte para a Imagem


function drawThrusters_A() {
    // small left thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        -8, ship_A_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 15 // Largura e Altura da frame a desenhar
    );

    // small rigth thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        5, ship_A_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 15 // Largura e Altura da frame a desenhar
    );

    // large middlet thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        -1, ship_A_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 8 // Largura e Altura da frame a desenhar
    );
}

function drawThrusters_B() {
    // small left thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        -8, ship_B_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 15 // Largura e Altura da frame a desenhar
    );

    // small rigth thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        5, ship_B_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
        4, flameImage.height / 15 // Largura e Altura da frame a desenhar
    );

    // large middlet thruster
    context.drawImage( // Desenhar frame da sprite sheet
        flameImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        138, flameImage.height, // Largura e Altura da frame a recortar
        -1, ship_B_Image.height / 6 / 2, // Coordenadas do canto sup esquerdo destino no canvas = base da nave
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

function drawExplosion_A() {

    // Usar countFrame para identificar a frame a retirar da Sprite Sheet
    sprite.thisFrameX = (sprite.countFrame % sprite.totalColumns) * explosionImage.width / sprite.totalColumns; // x definido por countFrame modulus 12 (frames por linha) X width de cada frame
    sprite.thisFrameY = Math.floor(sprite.countFrame / sprite.totalColumns) * explosionImage.height / sprite.totalRows; // y definido por countFrame / 12 (frames por linha) X heigth de cada frame

    //desenhar a explosão
    context.drawImage( // Desenhar frame da sprite sheet
        explosionImage, // Imagem da sprites sheet toda
        sprite.thisFrameX, sprite.thisFrameY, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows, // Largura e Altura da frame a recortar
        ship_A.position.getX() - 50, ship_A.position.getY() - 55, // Coordenadas do canto sup esquerdo destino no canvas
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows // Largura e Altura da frame a desenhar
    );

    spriteTimer();         // avançar animação da explosão
};

function drawExplosion_B() {

    // Usar countFrame para identificar a frame a retirar da Sprite Sheet
    sprite.thisFrameX = (sprite.countFrame % sprite.totalColumns) * explosionImage.width / sprite.totalColumns; // x definido por countFrame modulus 12 (frames por linha) X width de cada frame
    sprite.thisFrameY = Math.floor(sprite.countFrame / sprite.totalColumns) * explosionImage.height / sprite.totalRows; // y definido por countFrame / 12 (frames por linha) X heigth de cada frame

    //desenhar a explosão
    context.drawImage( // Desenhar frame da sprite sheet
        explosionImage, // Imagem da sprites sheet toda
        sprite.thisFrameX, sprite.thisFrameY, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows, // Largura e Altura da frame a recortar
        ship_B.position.getX() - 50, ship_B.position.getY() - 55, // Coordenadas do canto sup esquerdo destino no canvas
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows // Largura e Altura da frame a desenhar
    );

    spriteTimer();         // avançar animação da explosão
};


function spriteTimer() {
    if (sprite.countFrame >= sprite.totalFrames - 1) { //conta se já deu a volta toda à sprite sheet
        kill();                                        //se sim, acabar a execução do programa
    }
    else if (sprite.partialFrame > 1) {
        sprite.countFrame++;                       //avançar para frame seguinte da spreadsheet
        sprite.partialFrame = 0;                   //repor a contagem para passar a frame seguinte
    }
    else {
        sprite.partialFrame += 0.25;               //número de frames da spritesheet que passam por cada refresh do browser
    };
};
