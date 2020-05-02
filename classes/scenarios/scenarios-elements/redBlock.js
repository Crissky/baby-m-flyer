import { BasicAnimated } from "../../basic/basicAnimated.js";

const sprites = new Image();
sprites.src = '../sprites/redBlock.png';

export class RedBlock extends BasicAnimated {
    constructor(canvas) {
        super(sprites, canvas, 16, 0, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 25);
    }
}
