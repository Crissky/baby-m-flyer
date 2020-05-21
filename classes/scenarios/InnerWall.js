import { BasicObject } from "../basic/BasicObject.js";

export class InnerWall extends BasicObject {
    constructor(canvas, sizeMultiplier = 1) {
        const sprites = new Image();
        sprites.src = "./sprites/brick-wall4.png";
        super(sprites, canvas,
            0, 0,
            32, 32,
            0, 0,
            0, 0,
            0, 0, 0, 0,
            sizeMultiplier, false);
        this.maxLoopX = Math.ceil((this.canvas.width / this.getTrueWidth())) + 1;
        this.maxLoopY = Math.ceil(((this.canvas.height * 0.6) / this.getTrueHeight()));
    }

    update(speedScreen) {
        let newSpeedScreen = Math.ceil(speedScreen / 2)
        super.update(newSpeedScreen);
    }

    render() {
        this.resetPosX();
        for (let indexX = 0; indexX < this.maxLoopX; indexX++) {
            for (let indexY = 0; indexY < this.maxLoopY; indexY++) {
                this.context.drawImage(
                    this.sprites,
                    this.sourceX, this.sourceY, // Sprite X, Sprite Y
                    this.width, this.height, // Tamanho de recorte na Sprite
                    (this.posX + (this.getTrueWidth() * indexX)), (this.posY + (this.getTrueHeight() * indexY)), // Posição na tela
                    this.getTrueWidth(), this.getTrueHeight() // Tamanho da imagem na tela
                );
            }
        }
        
        this.fillBlack();
        // console.log("InnerWall - MaxLoop X e Y", this.maxLoopX, this.maxLoopY);
    }

    fillBlack() {
        this.context.save();
        this.context.fillStyle = '#000000';
        this.context.globalAlpha = 0.7;
        this.context.fillRect(0, this.posY, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    resetPosX() {
        if (this.posX < -(this.getTrueWidth())) {
            this.posX = this.posX + this.getTrueWidth();
        }
    }
}