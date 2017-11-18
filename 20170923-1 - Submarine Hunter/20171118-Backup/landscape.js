var SeaScapeImage = new Image(); // Cria nova Imagem
SeaScapeImage.src = "Assets/landscape/Seascape_Light.png"; // Define ficheiro fonte para a Imagem

function drawSeaScape() {
    ctxSea.drawImage( // Desenhar frame da sprite sheet
        SeaScapeImage, // Imagem da sprites sheet toda
        0, 0, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        SeaScapeImage.width, SeaScapeImage.height, // Largura e Altura da frame a recortar
        0, 0, // Coordenadas do canto sup esquerdo destino no canvas
        width, height // Largura e Altura da frame a desenhar
    );
};

