
// Space Game Menu
var gameMenuImage = new Image(); // Cria nova Imagem
gameMenuImage.src = "Assets/menu/MenuSpaceBackground-Small.jpg"; // Define ficheiro fonte para a Imagem

function drawGameMenu() {
    context.drawImage( // Desenhar frame da sprite sheet
        gameMenuImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        gameMenuImage.width, gameMenuImage.height, // Largura e Altura da frame a recortar
        0, 0, // Coordenadas do canto sup esquerdo destino no canvas
        width, heigth // Largura e Altura da frame a desenhar
    );
};

// Starfield
var starfieldImage = new Image(); // Cria nova Imagem
starfieldImage.src = "Assets/backgrounds/Starfield5.jpg"; // Define ficheiro fonte para a Imagem

function drawStarfield() {
    context.drawImage( // Desenhar frame da sprite sheet
        starfieldImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        starfieldImage.width, starfieldImage.height, // Largura e Altura da frame a recortar
        0, 0, // Coordenadas do canto sup esquerdo destino no canvas
        width, heigth // Largura e Altura da frame a desenhar
    );
};


// Asteroids
var asteroidImageArray = [];

for (var i = 1; i <= 11; i++) {
    var asteroidImage = new Image(); // Cria nova Imagem
    asteroidImage.src = "Assets/asteroids/Asteroid " + i + ".png"; // Define ficheiro fonte para a Imagem
    asteroidImageArray.push(asteroidImage);
}

function drawAsteroid(x,y,w,h,i) {
    context.drawImage( // Desenhar frame da sprite sheet
        asteroidImageArray[i], // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        asteroidImageArray[i].width, asteroidImageArray[i].height, // Largura e Altura da frame a recortar
        x, y, // Coordenadas do canto sup esquerdo destino no canvas
        w, h // Largura e Altura da frame a desenhar
    );
};



// Ship
var shipImage = new Image(); // Cria nova Imagem
shipImage.src = "Assets/ship/Ship_1-Green.png"; // Define ficheiro fonte para a Imagem

function drawShip(x,y,w,h) {
    context.drawImage( // Desenhar frame da sprite sheet
        shipImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        shipImage.width, shipImage.height, // Largura e Altura da frame a recortar
        x, y, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        w, h // Largura e Altura da frame a desenhar
    );
};

// Thruster
var thrustImage = new Image(); // Cria nova Imagem
thrustImage.src = "Assets/thruster/Fire.png"; // Define ficheiro fonte para a Imagem

function drawThrust(x,y,w,h) {
    context.drawImage( // Desenhar frame da sprite sheet
        thrustImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        thrustImage.width, thrustImage.height, // Largura e Altura da frame a recortar
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

function drawExplosionShip() {
    // Usar countFrame para identificar a frame a retirar da Sprite Sheet
    sprite.thisFrameX = (sprite.countFrame % sprite.totalColumns) * explosionImage.width / sprite.totalColumns; // x definido por countFrame modulus 12 (frames por linha) X width de cada frame
    sprite.thisFrameY = Math.floor(sprite.countFrame / sprite.totalColumns) * explosionImage.height / sprite.totalRows; // y definido por countFrame / 12 (frames por linha) X heigth de cada frame

    //desenhar a explosão
    context.drawImage( // Desenhar frame da sprite sheet
        explosionImage, // Imagem da sprites sheet toda
        sprite.thisFrameX, sprite.thisFrameY, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows, // Largura e Altura da frame a recortar
        Ship_A.position.getX() - 55, Ship_A.position.getY() - 55, // Coordenadas do canto sup esquerdo destino no canvas
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

