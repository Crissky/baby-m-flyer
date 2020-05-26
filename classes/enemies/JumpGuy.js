import { BasicAnimated } from "../basic/BasicAnimated.js";
import { Sound } from "../../utils/Sound.js";

export class JumpGuy extends BasicAnimated {
    constructor(canvas, debug = false) {
        const sprites = new Image();
        sprites.src = './sprites/jump-guy.png';
        super(sprites, canvas,
            25, 0,
            25, 29,
            0, 0,
            -1, 0,
            5, 8, 10, 2,
            1.5, 7, 10, debug);

        this.runFrames = [0, 1, 2, 3];
        this.jumpFrames = [4];
        this.fallFrames = [5];
        this.sitFrames = [6];
        this.frames = this.runFrames;
        this.indexFrame = 0;
        this.gravity = 0.2;
        this.status;
        this.setRun();
        this.jumpSound = new Sound("./sounds/smw2_boing.wav");
        this.sitSound = new Sound("./sounds/smw2_yoshi_throws.wav");


    }

    enumStatus = {
        FALL: 'FALL',
        JUMP: 'JUMP',
        RUN: 'RUN',
        SIT: 'SIT'
    }

    setFall() {
        this.frames = this.fallFrames;
        this.status = this.enumStatus.FALL;
    }

    setJump() {
        this.frames = this.jumpFrames;
        this.status = this.enumStatus.JUMP;
        this.speedY = -7;
        this.jumpSound.play();
    }
    setRun() {
        this.frames = this.runFrames;
        this.status = this.enumStatus.RUN;
        this.speedY = 0;
    }

    setSit() {
        this.frames = this.sitFrames;
        this.status = this.enumStatus.SIT;
        this.speedX = 0;
        this.speedY = 0;
        this.sitSound.play();
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

    isSit() {
        return (this.status === this.enumStatus.SIT);
    }

    isStand() {
        return (this.isRun() || this.isSit());
    }

    update(speedScreen) {
        if (!this.isStand()) {
            this.speedY += this.gravity;
        }
        if (this.isJump() && this.speedY > 0) {
            this.setFall();
        }
        this.posX += this.speedX - speedScreen;
        this.posY += this.speedY;
        this.updateFrame(speedScreen);
    }

    updateFrame(speedScreen) {
        this.currentFrameTime = ++this.currentFrameTime % Math.ceil(this.waitFrameTime / speedScreen);
        if (this.currentFrameTime === 0) {
            this.currentFrame = this.frames[++this.indexFrame % this.frames.length];
        }
    }
    debugRect() {
        super.debugRect('#ff0000');
    }
}