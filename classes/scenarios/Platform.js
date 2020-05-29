import { BasicObject } from "../basic/BasicObject.js";

export class StartPlatform extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/platform2.png';
        super(sprites, canvas,
            0, 0,
            16, 17,
            0, 0,
            0, 0,
            0, 0, 0, 12,
            1, debug);
    }

    debugRect() {
        super.debugRect("#00ff00");
    }
}

export class MidPlatform extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/platform2.png';
        super(sprites, canvas,
            0, 17,
            16, 17,
            0, 0,
            0, 0,
            0, 0, 0, 12,
            1, debug);
    }

    debugRect() {
        super.debugRect("#00ff00");
    }
}

export class EndPlatform extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/platform2.png';
        super(sprites, canvas,
            0, 34,
            16, 17,
            0, 0,
            0, 0,
            0, 0, 0, 12,
            1, debug);
    }

    debugRect() {
        super.debugRect("#00ff00");
    }
}