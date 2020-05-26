import { BasicRotatedObject } from "../basic/BasicRotateObject.js";
import { Sound } from "../../utils/Sound.js";

export class FireBall extends BasicRotatedObject {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/fireball.png';
        super(sprites, canvas,
            16, 0,
            16, 16,
            0, 0,
            -1, 0,
            2, 2, 2, 2,
            1.5, 1, 1, 0, debug);
        this.spawnSound = new Sound("./sounds/smw_bowser_fire.wav");
        this.spawnSound.play();
    }

    update(speedScreen = 0) {
        this.posX += this.speedX - speedScreen;
        this.posY += this.speedY;
        this.currentDegree = (this.currentDegree - 10) % 360;
    }

    debugRect() {
        super.debugRect('#ff0000');
    }
}