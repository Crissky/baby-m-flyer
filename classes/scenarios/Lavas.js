import { BasicFloorLite } from "../basic/BasicFloorLite.js";
import { BasicAnimated } from "../basic/BasicAnimated.js";
import { randomIntFromInterval } from "../../utils/Random.js";

export class Lava1 extends BasicFloorLite {
    constructor(canvas, sizeMultiplier = 1, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/lava.png";
        super(sprites, canvas,
            32, 8,
            32, 46,
            sizeMultiplier, debug);
        this.currentFrameTime = 0;
        this.waitFrameTime = 20;
        this.currentFrame = 0;
        this.maxFrame = 4;
        this.lavaBubbleList = [];
        this.randomFrequency = 40000 / this.canvas.width;
        console.log("Lava Bubbles randomFrequency:", this.randomFrequency);
    }

    update(screenSpeed) {
        this.updateFrame();

        if (this.isRandomStart()) {
            this.addLavaBubble();
        }
        this.lavaBubbleList.forEach(lavaBubble => {
            lavaBubble.update(screenSpeed);
        });
        this.lavaBubbleList = this.lavaBubbleList.filter(function (value, index, arr) {
            return value.currentFrame < 4;
        });

        super.update(screenSpeed)
    }

    updateFrame(ScreenSpeed = 1) {
        this.currentFrameTime = ++this.currentFrameTime % Math.ceil(this.waitFrameTime / ScreenSpeed);
        if (this.currentFrameTime === 0) {
            this.currentFrame = ++this.currentFrame % this.maxFrame;
        }
    }

    resetPosX() {
        if (this.posX < -(this.getTrueWidth())) {
            this.posX = this.posX + this.getTrueWidth();
        }
    }

    render() {
        this.resetPosX();
        let maxLoop = Math.ceil((this.canvas.width / this.getTrueWidth())) + 1;
        for (let index = 0; index < maxLoop; index++) {
            this.context.drawImage(
                this.sprites,
                (this.sourceX * this.currentFrame), this.sourceY, // Sprite X, Sprite Y
                this.width, this.height, // Tamanho de recorte na Sprite
                (this.posX + (this.getTrueWidth() * index)), this.posY, // Posição na tela
                this.getTrueWidth(), this.getTrueHeight() // Tamanho da imagem na tela
            );
            this.lavaBubbleList.forEach(lavaBubble => {
                lavaBubble.render();
            });
        }

        this.lavaBubbleList.forEach(lavaBubble => {
            lavaBubble.render();
        });

        if (this.debugMode === true) {
            this.debugRect();
        }
    }

    addLavaBubble() {
        let lavaBubble = new LavaBubble(this.canvas);
        lavaBubble.posX = randomIntFromInterval(0, this.canvas.width);
        lavaBubble.posY = this.posY - lavaBubble.height;
        lavaBubble.waitFrameTime = randomIntFromInterval(10, 20);

        this.lavaBubbleList.push(lavaBubble);
    }

    isRandomStart() {
        return (0 === randomIntFromInterval(0, this.randomFrequency));
    }
}


class LavaBubble extends BasicAnimated {
    constructor(canvas) {
        const sprites = new Image();
        sprites.src = './sprites/lava.png';
        super(sprites, canvas, 32, 0, 32, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 20);
    }

    update(speedScreen) {
        this.posX -= speedScreen;
        this.updateFrame(1);
    }

}