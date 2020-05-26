import { BasicAnimated } from "../basic/BasicAnimated.js";

export class WoodenLegShyguy extends BasicAnimated {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/wooden-leg-shyguy.png';
        super(sprites, canvas,
            30, 0,
            30, 81,
            0, 0,
            -0.4, 0,
            12, 5, 12, 50,
            1.5, 22, 5, debug);
    }

    debugRect() {
        super.debugRect("#ff0000");
    }

    updateFrame() {
        super.updateFrame(1);
    }
}