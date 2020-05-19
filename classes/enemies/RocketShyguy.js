import { BasicRotatedObject } from "../basic/BasicRotateObject.js";
import { Sound } from "../../utils/Sound.js";

export class RocketShyguy extends BasicRotatedObject {
    constructor(canvas, player, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/shyguy-rocket.png";
        super(sprites, canvas,
            58, 0,
            58, 33,
            800, 500,
            0, 0,
            15, 20, 10, 5,
            1, 2, 80, 0, debug);

        this.player = player;
        this.accelY = 0.08;
        this.maxSpeedY = 2;
        this.shootSound = new Sound("./sounds/pSE_HORN_HEYHO_ON.wav");
        this.shootSound.play();
    }

    update(speedScreen) {
        this.aimPlayer();
        super.update(speedScreen);
    }

    debugRect() {
        super.debugRect('#ff0000');
    }

    aimPlayer() {
        if (this.getCenterPosY() < this.player.getCenterPosY()) {
            this.speedY += this.accelY;
            this.speedY = this.speedY > this.maxSpeedY ? this.maxSpeedY : this.speedY;
        } else if (this.getCenterPosY() > this.player.getCenterPosY()) {
            this.speedY -= this.accelY;
            this.speedY = this.speedY < -this.maxSpeedY ? -this.maxSpeedY : this.speedY;
        } else {
            this.speedY = 0;
            console.log("CENTER")
        }
    }
}