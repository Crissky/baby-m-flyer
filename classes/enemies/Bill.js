import { BasicObject } from "../basic/BasicObject.js";
import { Sound } from "../../utils/Sound.js";

export class Bill extends BasicObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/bullet-bill.png";
        super(sprites, canvas,
            0, 0,
            37, 30,
            0, 0,
            0, 0,
            7, 4, 4, 4,
            1, debug);
        this.shootSound = new Sound("./sounds/bullet-bill.wav");
        this.shootSound.play();
    }

    debugRect() {
        super.debugRect('#ff0000');
    }

}