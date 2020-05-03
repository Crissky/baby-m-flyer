import { BasicObject } from "../basic/BasicObject.js";

const sprites = new Image();
sprites.src = '../../sprites/sprites.png';

export class PipeDOWN extends BasicObject {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            0, 169, 52, 400, -100, 0,
            0, 0,
            2, 2, 2, 0,
            1, debug);
            this.directionY = 1;
    }
    
    reset() {
        this.sourceX = 0;
        this.sourceY = 169;
        this.width = 52;
        this.height = 400;
        this.posX = -100;
        this.posY = 0;
    }

    debugRect() {
        super.debugRect('#ff0000');
    }
}