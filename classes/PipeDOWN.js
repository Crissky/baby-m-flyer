export class PipeDOWN {
    constructor(context, sprites, canvas, debug=false) {
        this.debugMode = debug;
        this.sourceX = 0;
        this.sourceY = 169;
        this.width = 52;
        this.height = 400;
        this.posX = -100;
        this.posY = 0;
        this.directionY = 1;
        this.collisionToleranceX1 = 2;
        this.collisionToleranceX2 = 2;
        this.collisionToleranceY1 = 2;
        this.collisionToleranceY2 = 0;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    reset() {
        this.sourceX = 0;
        this.sourceY = 169;
        this.width = 52;
        this.height = 400;
        this.posX = -100;
        this.posY = 0;
    }
    render() {
            this.context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            this.posX, this.posY, // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
        if(this.debugMode === true){
            this.debugRect();
        }
    }
    debugRect() {
        this.context.globalAlpha = 0.5;
        this.context.fillStyle = '#ff0000';
        let collisionRect = this.getCollisionRect();
        this.context.fillRect(collisionRect.x1, collisionRect.y1, (collisionRect.x2 - collisionRect.x1), (collisionRect.y2 - collisionRect.y1));
        this.context.globalAlpha = 1.0;
    }
    getCollisionRect() {
        return {
            x1: (this.posX + this.collisionToleranceX1),
            x2: ((this.posX + this.width) - this.collisionToleranceX2),
            y1: (this.posY + this.collisionToleranceY1),
            y2: ((this.posY + this.height) - this.collisionToleranceY2)
        }   
    }
}