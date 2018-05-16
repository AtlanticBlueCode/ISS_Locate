
var explosionImage = new Image();   // Create new img element
explosionImage.src = "Assets/explosion/Sprite Sheet/ExplosionA1.png"; // Set source path


class Explosion{

    constructor(x, y) {
        this.pos = new Vector(
            x,
            y
        );
        this.exploding = true;
        this.explosionSprite = {
            countFrame: 0, // Contador de frames passadas
            partialFrame: 0, // Contador de sub frames do browser para carregar nova frame da sprite sheet
            thisFrameX: 0, // Coordenada x da frame a tirar da sprite sheet
            thisFrameY: 0, // Coordenada y da frame a tirar da sprite sheet
            totalColumns: 32, // Frames por fila da sprite sheet	
            totalRows: 1, // Filas de Frames da sprite sheet
            totalFrames: 32// Total de frames na sprite sheet
        };
    }

    draw () {
        // Usar countFrame para identificar a frame a retirar da Sprite Sheet
        this.explosionSprite.thisFrameX = 3 + (this.explosionSprite.countFrame % this.explosionSprite.totalColumns) * explosionImage.width / this.explosionSprite.totalColumns; // x definido por countFrame modulus 12 (frames por linha) X width de cada frame
        this.explosionSprite.thisFrameY = Math.floor(this.explosionSprite.countFrame / this.explosionSprite.totalColumns) * explosionImage.height / this.explosionSprite.totalRows; // y definido por countFrame / 12 (frames por linha) X height de cada frame

        //desenhar a explosão
        canvases[2].context.drawImage(
            explosionImage, // Imagem da sprites sheet toda
            this.explosionSprite.thisFrameX, this.explosionSprite.thisFrameY, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
            explosionImage.width / this.explosionSprite.totalColumns, explosionImage.height / this.explosionSprite.totalRows, // Largura e Altura da frame a recortar
            this.pos._x-50, this.pos._y - 50, // Coordenadas do canto sup esquerdo destino no canvas
            explosionImage.width / this.explosionSprite.totalColumns, explosionImage.height / this.explosionSprite.totalRows // Largura e Altura da frame a desenhar
        );

        this.timer();         // avançar animação da explosão
    };

    timer () {
        if (this.explosionSprite.countFrame >= this.explosionSprite.totalFrames - 1) { //conta se já deu a volta toda à sprite sheet
//            this.reset();
            this.exploding = false;
        }
        else if (this.explosionSprite.partialFrame > 1) {
            this.explosionSprite.countFrame++;                       //avançar para frame seguinte da spreadsheet
            this.explosionSprite.partialFrame = 0;                   //repor a contagem para passar a frame seguinte
        }
        else {
            this.explosionSprite.partialFrame += 0.5;               //número de frames da spritesheet que passam por cada refresh do browser
        };
    };

    reset() {
        this.explosionSprite.countFrame = 0;
        this.explosionSprite.partialFrame = 0;
    };
};