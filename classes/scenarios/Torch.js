import { BasicAnimated } from "../basic/BasicAnimated.js";

export class Torch extends BasicAnimated {
    constructor(canvas) {
        const sprites = new Image();
        sprites.src = "./sprites/torch.png";
        super(sprites, canvas,
            60, 0,
            60, 69,
            0, 0,
            0, 0,
            0, 0, 0, 0,
            1.5, 4, 10, false);
    }
}