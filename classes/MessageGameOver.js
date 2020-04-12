export class MessageGameOver {
    constructor(context, sprites, canvas) {
        this.sourceX = 153;
        this.sourceY = 153;
        this.width = 188;
        this.height = 38;
        this.posX = (canvas.width / 2) - 174 / 2;
        this.posY = 100;
        this.collisionTolerance = 3;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    mDraw() {
        this.context.drawImage(
          this.sprites,
          this.sourceX, this.sourceY, // Sprite X, Sprite Y
          this.width, this.height, // Tamanho de recorte na Sprite
          this.posX, this.posY, // Posição na tela
          this.width, this.height // Tamanho da imagem na tela
        );
    }
}