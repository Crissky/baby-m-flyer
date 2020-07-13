import { BasicAnimated } from "../basic/BasicAnimated.js";
import { Sound } from "../../utils/Sound.js";

export class BabyP extends BasicAnimated {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/baby-P.png';
        super(sprites, canvas,
            33, 0,
            33, 55,
            (canvas.width * 0.2), (canvas.height * 0.2),
            0, 0,
            7, 10, 30, 5,
            1, 8, 11, debug);

        this.gravity = 0.2;
        this.defaultGravity = this.gravity;
        this.status;
        this.jumpSound = new Sound("./sounds/babyPjump.wav");
        this.downSound = new Sound("./sounds/babyPdown.wav");
        this.setFall();
    }

    enumStatus = {
        FALL: 'FALL',
        JUMP: 'JUMP',
        RUN: 'RUN'
    }

    setFall() {
        this.status = this.enumStatus.FALL;
        console.log("Status:", this.status);
    }

    setJump() {
        this.status = this.enumStatus.JUMP;
        this.speedY = -7;
        this.waitFrameTime = 5;
        this.jumpSound.play();
        console.log("Status:", this.status);
    }

    setRun(newPosY) {
        this.status = this.enumStatus.RUN;
        this.speedY = 0;
        this.setEndPosY(newPosY);
        this.waitFrameTime = 10;
        console.log("Status:", this.status);
    }

    isFall() {
        return (this.status === this.enumStatus.FALL);
    }

    isJump() {
        return (this.status === this.enumStatus.JUMP);
    }

    isRun() {
        return (this.status === this.enumStatus.RUN);
    }

    update(speedScreen) {
        if (!this.isRun()) {
            this.speedY += this.gravity;
        }
        if (!this.isFall() && this.speedY > 0) {
            this.setFall();
        }

        this.posX += this.speedX;
        this.posY += this.speedY;
        this.updateFrame(speedScreen);
    }

    debugRect(color = '#0000ff') {
        super.debugRect();
        this.context.save();

        this.context.globalAlpha = 0.5;
        this.context.fillStyle = '#00ff00';
        let floorCollisionRect = this.getFloorCollisionRect();
        floorCollisionRect.forEach(rect => {
            this.context.fillRect(rect.x1, rect.y1, (rect.x2 - rect.x1), (rect.y2 - rect.y1));
        });

        this.context.restore();
    }

    click() {
        if (this.isRun()) {
            this.setJump();
        } else {
            this.speedY = 9;
            this.downSound.play();
        }
    }

    reset() {
        super.reset();
        this.setFall();
        this.gravity = this.defaultGravity;
    }

    stop() {
        this.speedY = 0;
        this.speedX = 0;
        this.gravity = 0;
    }

    getFloorCollisionRect() {
        return [{
            x1: (this.posX + (this.getTrueWidth() * 0.1)),
            x2: (this.getEndPosX() - (this.getTrueWidth() * 0.4)),
            y1: (this.posY + (this.getTrueHeight() * 0.9)),
            y2: (this.getEndPosY() + 2)
        }]
    }
}