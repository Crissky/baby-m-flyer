export class MessageGetReady {
    constructor(context, sprites, canvas) {
        this.sourceX = 134;
        this.sourceY = 0;
        this.width = 174;
        this.height = 152;
        this.posX = (canvas.width / 2) - 174 / 2;
        this.posY = 100;
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