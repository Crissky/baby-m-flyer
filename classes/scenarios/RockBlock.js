import { BasicObject } from "../basic/BasicObject.js";

export class RockBlock extends BasicObject {
    constructor(canvas, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/rock-block.png";
        super(sprites, canvas,
            0, 0,
            48, 96,
            canvas.width, canvas.height,
            0, 0,
            2, 2, 2, 2,
            1, debug);
    }

    debugRect() {
        super.debugRect('#ff0000');
    }

}