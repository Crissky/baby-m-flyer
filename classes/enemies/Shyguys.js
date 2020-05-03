import { BasicObject } from "../basic/BasicObject.js";

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

export class ShyguyBlue extends BasicObject {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            58, 77, 27, 30, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }
}

export class ShyguyBrown extends BasicObject {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            87, 77, 27, 30, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }
}

export class ShyguyPurple extends BasicObject {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            116, 77, 27, 30, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }
}

export class ShyguyLink extends BasicObject {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            0, 108, 18, 39, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }
}