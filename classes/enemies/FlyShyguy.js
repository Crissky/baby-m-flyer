import { BasicAnimated } from "../basic/BasicAnimated.js";

export class FlyShyguy extends BasicAnimated {
    constructor(canvas, floor, debug) {
        const sprites = new Image();
        sprites.src = './sprites/fly-shyguy.png';
        super(sprites, canvas,
            20, 0,
            20, 32,
            0, 0,
            0, 1,
            0, 0, 0, 0,
            1, 4, 5, debug);
        this.floor = floor;
        this.defaultGravity = 0.1;
        this.gravity = this.defaultGravity;
        this.maxSpeedY = 3;
        this.incrementFrame = 1;
    }

    update(speedScreen) {
        this.updateSpeedY();
        this.setSpeedY(this.speedY + this.gravity);
        super.update(speedScreen);
    }

    updateFrame(speedScreen = 1) {
        this.currentFrameTime = ++this.currentFrameTime % Math.ceil(this.waitFrameTime / speedScreen);
        if (this.currentFrameTime === 0) {
            this.currentFrame += this.incrementFrame;
            this.updateIncrementFrame();
        }
    }

    updateSpeedY() {
        if (this.getEndPosY() >= (this.floor.posY - 45)) {
            this.gravity = -this.defaultGravity;
        } else if (this.getEndPosY() <= (this.floor.posY - 100)) {
            this.gravity = this.defaultGravity;
        }
    }

    setSpeedY(newValue) {
        this.speedY = Math.max(-this.maxSpeedY, Math.min(this.maxSpeedY, newValue));
    }

    updateIncrementFrame() {
        if (this.currentFrame === (this.maxFrame - 1)) {
            this.incrementFrame = -1;
        } else if (this.currentFrame === 0) {
            this.incrementFrame = 1;
        }
        Math.min()
    }
}