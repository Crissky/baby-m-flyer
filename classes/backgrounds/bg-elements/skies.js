import { BasicObject } from "../../basicObject.js";

const scenario = new Image();
scenario.src = '../sprites/scenario.png';

export class Sky1 extends BasicObject{
    constructor(canvas, sizeMultiplier) {
        super(scenario,
            3, 3,
            511, 296,
            0, 0,
            canvas, sizeMultiplier);
    }
}