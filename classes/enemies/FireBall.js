import { BasicRotatedObject } from "../basic/BasicRotateObject.js";
import { Sound } from "../../utils/Sound.js";
import { randomIntFromInterval } from "../../utils/Random.js";

export class FireBall extends BasicRotatedObject {
    constructor(canvas, floor, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/fireball.png';
        super(sprites, canvas,
            16, 0,
            16, 16,
            0, 0,
            -1, 0,
            2, 2, 2, 2,
            1, 1, 1, 0, debug);
        this.floor = floor;
        this.gravity = 0.15;
        this.rotateSpeed = 10;
        this.maxSpeedY = randomIntFromInterval(3, 7);
        this.spawnSound = new Sound("./sounds/smw_bowser_fire.wav");
        this.impactSound = new Sound("./sounds/smw_fireball.wav");
        this.spawnSound.play();
    }

    update(speedScreen = 0) {
        if (this.speedY > 0 && this.getEndPosY() > this.floor.posY) {
            this.speedY = -this.maxSpeedY;
            this.impactSound.play();
        }

        if (this.speedY < 0) {
            this.rotateSpeed = 40;
        } else {
            this.rotateSpeed -= 1;
            this.rotateSpeed = Math.max(10, this.rotateSpeed);
        }
        this.speedY += this.gravity;
        this.posX += this.speedX - speedScreen;
        this.posY += this.speedY;
        this.currentDegree = (this.currentDegree - this.rotateSpeed) % 360;
    }

    debugRect() {
        super.debugRect('#ff0000');
    }
}