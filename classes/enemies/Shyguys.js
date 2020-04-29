import { BasicObject } from "../basic/basicObject.js";

const sprites = new Image();
sprites.src = '../../sprites/sprites.png';

export class ShyguyRed extends BasicObject {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            29, 77, 27, 30, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }
}

export class ShyguyGreen extends BasicObject {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            0, 77, 27, 30, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }
}