export class Floor {
    constructor(context, sprites, canvas, debug=false) {
        this.debugMode = debug;
        this.sourceX = 0;
        this.sourceY = 610;
        this.width = 145;
        this.height = 79;
        this.posX = 0;
        this.posY = (canvas.height - this.height);
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    update(ScreenSpeed) {
        this.posX = this.posX - ScreenSpeed;
    }
    resetPosX() {
        if(this.posX < (-this.width)) {
            this.posX = this.posX + this.width;
        }
    }
    render() {
        this.resetPosX();
        
        let maxLoop = Math.ceil( (this.canvas.width / this.width)) + 1;
        for (let index = 0; index < maxLoop; index++) {
            this.context.drawImage(
                this.sprites,
                this.sourceX, this.sourceY, // Sprite X, Sprite Y
                this.width, this.height, // Tamanho de recorte na Sprite
                (this.posX + (this.width * index)), this.posY, // Posição na tela
                this.width, this.height // Tamanho da imagem na tela
            );        
        }
        if(this.debugMode === true){
            this.debugRect();
        }
    }
    debugRect() {
        this.context.globalAlpha = 0.5;
        this.context.fillStyle = '#ff0000';
        let collisionRect = this.getCollisionRect();
        collisionRect.forEach(rect => {
            this.context.fillRect(rect.x1, rect.y1, (rect.x2 - rect.x1), (rect.y2 - rect.y1));
        });
        this.context.globalAlpha = 1.0;
    }
    getCollisionRect() {
        return [{
            x1: 0,
            x2: this.canvas.width,
            y1: this.posY,
            y2: (this.posY + this.height)
        }]
    }
}