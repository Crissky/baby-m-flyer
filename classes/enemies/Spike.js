import { BasicObject } from "../basic/BasicObject.js";

export class Spike extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/spike.png';
        super(sprites, canvas,
            0, 0,
            16, 16,
            0, 0,
            0, 0,
            2, 2, 5, 0,
            1, debug);
    }

    debugRect() {
        super.debugRect('#ff0000');
    }
}