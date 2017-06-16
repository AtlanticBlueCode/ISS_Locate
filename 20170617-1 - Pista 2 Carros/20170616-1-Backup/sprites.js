
// Background & Track
var trackImage = new Image(); // Cria nova Imagem
trackImage.src = "Assets/track/pista.png"; // Define ficheiro fonte para a Imagem

function drawTrack() {
    context.drawImage( // Desenhar frame da sprite sheet
        trackImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        trackImage.width, trackImage.height, // Largura e Altura da frame a recortar
        0, 0, // Coordenadas do canto sup esquerdo destino no canvas
        width, heigth // Largura e Altura da frame a desenhar
    );
};



// Car
var carImage = new Image(); // Cria nova Imagem
carImage.src = "Assets/car/Car - Blue.png"; // Define ficheiro fonte para a Imagem

function drawCar(x,y,w,h) {
    context.drawImage( // Desenhar frame da sprite sheet
        carImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        carImage.width, carImage.height, // Largura e Altura da frame a recortar
        x, y, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        w, h // Largura e Altura da frame a desenhar
    );
};


// Cone
var coneImage = new Image(); // Cria nova Imagem
coneImage.src = "Assets/cones/Cone.png"; // Define ficheiro fonte para a Imagem

function drawCone(x,y,w,h) {
    context.drawImage( // Desenhar frame da sprite sheet
        coneImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        coneImage.width, coneImage.height, // Largura e Altura da frame a recortar
        x, y, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        w, h // Largura e Altura da frame a desenhar
    );
};


// Explosão
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
    // Usar countFrame para identificar a frame a retirar da Sprite Sheet
    sprite.thisFrameX = (sprite.countFrame % sprite.totalColumns) * explosionImage.width / sprite.totalColumns; // x definido por countFrame modulus 12 (frames por linha) X width de cada frame
    sprite.thisFrameY = Math.floor(sprite.countFrame / sprite.totalColumns) * explosionImage.height / sprite.totalRows; // y definido por countFrame / 12 (frames por linha) X heigth de cada frame

    //desenhar a explosão
    context.drawImage( // Desenhar frame da sprite sheet
        explosionImage, // Imagem da sprites sheet toda
        sprite.thisFrameX, sprite.thisFrameY, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows, // Largura e Altura da frame a recortar
        Car_A.position.getX() - 50, Car_A.position.getY() - 50, // Coordenadas do canto sup esquerdo destino no canvas
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows // Largura e Altura da frame a desenhar
        );

    spriteTimer();         // avançar animação da explosão
};

function spriteTimer() {
    if (sprite.countFrame >= sprite.totalFrames - 1) { //conta se já deu a volta toda à sprite sheet
        GameWrapUp = true;
        console.log("Morreste!")
        sprite.countFrame = 0;                      //reset explosion for game restart
        sprite.partialFrame = 0;                    //reset explosion for game restart
    }
    else if (sprite.partialFrame > 1) {
        sprite.countFrame++;                       //avançar para frame seguinte da spreadsheet
        sprite.partialFrame = 0;                   //repor a contagem para passar a frame seguinte
    }
    else {
        sprite.partialFrame += 0.25;               //número de frames da spritesheet que passam por cada refresh do browser
    };
};

function resetExplosion() {
    sprite.countFrame = 0;
    sprite.partialFrame = 0;    
}