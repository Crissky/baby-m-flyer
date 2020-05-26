import { BasicObject } from "../basic/BasicObject.js";

export class CastleFloor1 extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/stone-floor1.png";
        super(sprites, canvas,
            0, 0,
            64, 14,
            0, 0,
            0, 0,
            0, 0, 0, 0,
            1, debug);
    }
}

export class CastleFloor2 extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/stone-floor2.png";
        super(sprites, canvas,
            0, 0,
            80, 14,
            0, 0,
            0, 0,
            0, 0, 0, 0,
            1, debug);
    }
}

export class CastleFloor3 extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/stone-floor3.png";
        super(sprites, canvas,
            0, 0,
            64, 24,
            0, 0,
            0, 0,
            0, 0, 0, 0,
            1, debug);
    }
}