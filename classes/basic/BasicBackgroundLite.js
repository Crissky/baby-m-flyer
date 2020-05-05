import { BasicObject } from "./BasicObject.js";

export class BasicBackgroundLite extends BasicObject {
    constructor (sprites, canvas, sourceX, sourceY, width, height, posX, posY, delay=30, sizeMultiplier=1, debug=false) {
        super(sprites, canvas,
            sourceX, sourceY,
            width, height,
            posX, posY,
            0, 0,
            0,0,0,0,
            sizeMultiplier, debug);
        this.time = 0;
        this.delay = delay;
    }

    update(ScreenSpeed) {
        this.time = ++this.time % Math.ceil(this.delay / ScreenSpeed);
        if(this.time === 0 ) {
            this.posX -= 1;
        }
    }

    render() {
        this.renderGradient();
        this.resetPosX();
        let maxLoop = Math.ceil( (this.canvas.width / this.getTrueWidth() )) + 1;
        for (let index = 0; index < maxLoop; index++) {
            this.context.drawImage(
                this.sprites,
                this.sourceX, this.sourceY, // Sprite X, Sprite Y
                this.width, this.height, // Tamanho de recorte na Sprite
                (this.posX + (this.getTrueWidth() * index)), this.posY, // Posição na tela
                this.getTrueWidth(), this.getTrueHeight() // Tamanho da imagem na tela
            );
            
        }
    }

    resetPosX() {
        if(this.posX < -(this.getTrueWidth()) ) {
            this.posX = this.posX + this.getTrueWidth();
        }
    }

    renderGradient() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0, "#03001e");
        my_gradient.addColorStop(0.4, "#c471ed");
        my_gradient.addColorStop(0.7, "#12c2e9");
        my_gradient.addColorStop(1, "#fdeff9");
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
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