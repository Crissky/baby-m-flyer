import { BasicBackground } from "./basicBackground.js";
import { Floor1 } from "./bg-elements/floors.js";

export class BackgroundFloor1 extends BasicBackground {
    constructor(canvas, sizeMultiplier=1, speedMultiplier=1, updateWaitTime=0){
        super(canvas, Floor1, sizeMultiplier, speedMultiplier, updateWaitTime);
    }
}