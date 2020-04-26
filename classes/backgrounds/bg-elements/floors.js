import { BasicObject } from "../../basicObject.js";

const scenario = new Image();
scenario.src = '../sprites/scenario.png';

export class Floor1 extends BasicObject{
    constructor(canvas, sizeMultiplier) {
        super(scenario,
            3, 299,
            512, 323,
            0, (canvas.height - 323),
            canvas, sizeMultiplier);
    }
}