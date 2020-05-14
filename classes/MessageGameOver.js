export class MessageGameOver {
    constructor(context, sprites, canvas) {
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 228;
        this.height = 48;
        this.posX = (canvas.width / 2) - this.width / 2;
        this.posY = 100;
        this.collisionTolerance = 3;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    render() {
        this.context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            this.posX, this.posY, // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
    }
}