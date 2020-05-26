import { BasicAnimated } from "../basic/BasicAnimated.js";

export class MuftiShyguy extends BasicAnimated {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/mufti-shyguy.png";
        super(sprites, canvas,
            25, 0,
            25, 27,
            0, 0,
            0, 0,
            8, 6, 10, 0,
            1.5, 5, 10, debug);

        this.hide = true;
    }

    updateFrame(speedScreen) {
        if (this.hide) {
            return;
        }
        this.currentFrameTime = ++this.currentFrameTime % Math.ceil(this.waitFrameTime / speedScreen);
        if (this.currentFrameTime === 0 && this.currentFrame < (this.maxFrame - 1) ) {
            this.currentFrame = ++this.currentFrame % this.maxFrame;
        }
    }

    show() {
        this.hide = false;
    }
}