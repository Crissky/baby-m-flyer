import { BasicBackground } from "./basicBackground.js";
import { Sky1 } from "./bg-elements/skies.js";

export class BackgroundSky1 extends BasicBackground {
    constructor(canvas, sizeMultiplier=1, speedMultiplier=0.01, updateWaitTime=100){
        super(canvas, Sky1, sizeMultiplier, speedMultiplier, updateWaitTime);
    }
}