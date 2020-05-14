import { BasicObject } from "./BasicObject.js";

export class BasicFloorLite extends BasicObject {
    constructor(sprites, canvas, sourceX, sourceY, width, height, sizeMultiplier = 1, debug = false) {
        super(sprites, canvas,
            sourceX, sourceY,
            width, height,
            0, (canvas.height - height),
            0, 0,
            0, 0, 0, 0,
            sizeMultiplier, debug);
    }

    update(ScreenSpeed) {
        this.posX = this.posX - ScreenSpeed;
    }

    render() {
        this.resetPosX();
        let maxLoop = Math.ceil((this.canvas.width / this.getTrueWidth())) + 1;
        for (let index = 0; index < maxLoop; index++) {
            this.context.drawImage(
                this.sprites,
                this.sourceX, this.sourceY, // Sprite X, Sprite Y
                this.width, this.height, // Tamanho de recorte na Sprite
                (this.posX + (this.getTrueWidth() * index)), this.posY, // Posição na tela
                this.getTrueWidth(), this.getTrueHeight() // Tamanho da imagem na tela
            );
        }
        if (this.debugMode === true) {
            this.debugRect();
        }
    }

    resetPosX() {
        if (this.posX < -(this.getTrueWidth())) {
            this.posX = this.posX + this.getTrueWidth();
        }
    }

    debugRect(color = '#ff0000') {
        super.debugRect(color);
    }

    getCollisionRect() {
        return [{
            x1: 0,
            x2: this.canvas.width,
            y1: this.posY,
            y2: (this.posY + this.getTrueHeight())
        }]
    }
}