import { BasicAnimated } from "../../basic/BasicAnimated.js";

const sprites = new Image();
sprites.src = './sprites/redBlock.png';

export class RedBlock extends BasicAnimated {
    constructor(canvas, debug=false) {
        super(sprites, canvas, 16, 0, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 25, debug);
    }
}
