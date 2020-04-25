import { BasicElement } from "./basicElement.js";

const scenario = new Image();
scenario.src = '../sprites/scenario.png';

export class Sky1 extends BasicElement{
    constructor(canvas, speedMultiplier=0.5, updateWaitTime=15) {
        super(scenario,
            3, 3,
            511, 296,
            0, 0,
            canvas,
            speedMultiplier, updateWaitTime);
    }
}