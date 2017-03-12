// Nuvem
var cloudImage = new Image(); // Cria nova Imagem
cloudImage.src = "Assets/clouds/Cloud-VeryLightBlue.png"; // Define ficheiro fonte para a Imagem

function drawCloud(x,y,w,h) {
    context.drawImage( // Desenhar frame da sprite sheet
        cloudImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        cloudImage.width, cloudImage.height, // Largura e Altura da frame a recortar
        x, y, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        w, h // Largura e Altura da frame a desenhar
    );
};


// Fada
var fairyImage = new Image(); // Cria nova Imagem
fairyImage.src = "Assets/fairies/Fairy-Base Blonde 3-Sized.png"; // Define ficheiro fonte para a Imagem

function drawFairy(x,y,w,h) {
    context.drawImage( // Desenhar frame da sprite sheet
        fairyImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        fairyImage.width, fairyImage.height, // Largura e Altura da frame a recortar
        x, y, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        w, h // Largura e Altura da frame a desenhar
    );
};

// Dust Trail
var trailImage = new Image(); // Cria nova Imagem
trailImage.src = "Assets/trail/Star Trail - Pink.png"; // Define ficheiro fonte para a Imagem

function drawTrail(x,y,w,h) {
    context.drawImage( // Desenhar frame da sprite sheet
        trailImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        trailImage.width, trailImage.height, // Largura e Altura da frame a recortar
        x, y, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        w, h // Largura e Altura da frame a desenhar
    );
};

// Relva
var grassImage = new Image(); // Cria nova Imagem
grassImage.src = "Assets/grass/Grass-Light.png"; // Define ficheiro fonte para a Imagem

function drawGrass(x) {
    context.drawImage( // Desenhar frame da sprite sheet
        grassImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        grassImage.width, grassImage.height, // Largura e Altura da frame a recortar
        x, height-grassImage.height*3/4, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        grassImage.width*3/4, grassImage.height*3/4 // Largura e Altura da frame a desenhar
    );
};


// Sky
var skyImage = new Image(); // Cria nova Imagem
skyImage.src = "Assets/landscape/Clear Sky 2.png"; // Define ficheiro fonte para a Imagem

function drawSky() {
    context.drawImage( // Desenhar frame da sprite sheet
        skyImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        skyImage.width, skyImage.height, // Largura e Altura da frame a recortar
        0,0, // Coordenadas do canto sup esquerdo destino no canvas = centro da nave
        width,height // Largura e Altura da frame a desenhar
    );
};