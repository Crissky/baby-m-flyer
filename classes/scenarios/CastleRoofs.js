import { BasicObject } from "../basic/BasicObject.js";

export class CastleRoof1 extends BasicObject {
    constructor(canvas, debug=false) {
        const sprites = new Image();
        sprites.src = "./sprites/inner-roof-castle.png";
        super(sprites, canvas,
            0, 0,
            48, 32,
            0, 0,
            0, 0,
            0, 0, 0, 0,
            1.5, debug);
    }
}