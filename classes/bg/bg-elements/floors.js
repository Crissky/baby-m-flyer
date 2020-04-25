import { BasicElement } from "./basicElement.js";

const scenario = new Image();
scenario.src = '../sprites/scenario.png';

export class Floor1 extends BasicElement{
    constructor(canvas, speedMultiplier=1, updateWaitTime=0) {
        super(scenario,
            0, 610,
            145, 79,
            0, (canvas.height - 79),
            canvas,
            speedMultiplier, updateWaitTime);
    }
}