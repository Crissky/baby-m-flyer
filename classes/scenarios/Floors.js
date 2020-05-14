import { BasicFloorLite } from "../basic/BasicFloorLite.js";

export class Floor1 extends BasicFloorLite {
    constructor(canvas, sizeMultiplier = 1, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/sprites.png";
        super(sprites, canvas,
            0, 610,
            145, 79,
            sizeMultiplier, debug);
    }
}