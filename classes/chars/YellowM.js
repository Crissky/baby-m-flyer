import { BasicChar } from "../basic/BasicChar.js";
import { Sound } from "../../utils/Sound.js";

const sprites = new Image();
sprites.src = './sprites/baby_W.png';

export class YellowM extends BasicChar {
    constructor(canvas, debug) {
        super(sprites, canvas,
            33, 0,
            33, 42,
            20, 50,
            0, 0,
            0, 0, 0, 0,
            1, debug);

        this.defaultGravity = 0.1;
        this.gravity = this.defaultGravity;
        this.collisionX1 = [8, 8, 8, 8, 10, 8, 8];
        this.collisionX2 = [10, 10, 10, 10, 12, 10, 10];
        this.collisionY1 = [10, 10, 10, 10, 15, 10, 10];
        this.collisionY2 = [10, 10, 10, 10, 12, 10, 10];
        this.magnetFrames = [5, 6];
        this.fallFrames = [4];
        this.fixedFrames = [0, 1, 2, 3];
        this.maxFrames = this.fallFrames;
        this.currentFrame = 6;
        this.waitFrameTime = 15;
        this.currentFrameTime = 0;
        this.status = this.enumStatus.FALL;
        this.magnetFixingSound = new Sound("./sounds/chocking.mp3", true);
        this.magnetFixedSound = new Sound("./sounds/magnet-fixed.wav");
        this.magnetOnSound = new Sound("./sounds/magnet-on.wav");
        this.magnetOffSound = new Sound("./sounds/magnet-off.wav");
    }

    enumStatus = {
        FALL: 'FALL',
        FIXED: 'fixed',
        MAGNET: 'magnet'
    }

    setFixed() {
        if (this.status != this.enumStatus.FIXED) {
            this.magnetFixedSound.play();
            this.magnetFixingSound.play();
        }
        this.status = this.enumStatus.FIXED;

    }

    setFall() {
        this.status = this.enumStatus.FALL;
        this.magnetFixingSound.stop();
    }

    setMagnet() {
        this.status = this.enumStatus.MAGNET;
        this.magnetFixingSound.stop();
    }

    update(screenSpeed) {
        if (this.status === this.enumStatus.FALL) {
            this.gravity = this.defaultGravity;
        } else if (this.status === this.enumStatus.MAGNET) {
            this.gravity = -(this.defaultGravity);
        } else if (this.status === this.enumStatus.FIXED) {
            this.gravity = 0;
            this.speedY = 0;
        }
        this.speedY += this.gravity;
        this.posY += this.speedY;
        this.updateFrame();
    }

    render() {
        this.context.drawImage(this.sprites,
            (this.sourceX * this.currentFrame), this.sourceY,
            this.width, this.height,
            this.posX, (this.posY - (this.height * (this.sizeMultiplier - 1))),
            this.getTrueWidth(), this.getTrueHeight()
        );

        if (this.debugMode === true) {
            this.debugRect();
        }
    }

    debugRect(color = '#0000ff') {
        this.context.save();

        this.context.globalAlpha = 0.5;
        this.context.fillStyle = color;
        let collisionRect = this.getCollisionRect();
        collisionRect.forEach(rect => {
            this.context.fillRect(rect.x1, rect.y1, (rect.x2 - rect.x1), (rect.y2 - rect.y1));
        });

        if (this.status != this.enumStatus.FALL) {
            this.context.fillStyle = '#00ff00';
            let magnetCollisionRect = this.getMagnetCollisionRect();
            magnetCollisionRect.forEach(rect => {
                this.context.fillRect(rect.x1, rect.y1, (rect.x2 - rect.x1), (rect.y2 - rect.y1));
            });
        }
        this.context.restore();
    }

    click() {
        if (this.status != this.enumStatus.FALL) {
            this.setFall();
            this.magnetOnSound.stop();
            this.magnetOffSound.play();
        } else {
            this.status = this.enumStatus.MAGNET;
            this.magnetOffSound.stop();
            this.magnetOnSound.play();
        }
    }

    updateFrame(screenSpeed) {
        this.changeFrames();
        this.currentFrameTime = ++this.currentFrameTime % this.waitFrameTime;
        if (this.currentFrameTime === 0) {
            this.currentFrame = this.maxFrames[Math.floor(Math.random() * this.maxFrames.length)];
        }
    }

    changeFrames() {
        if (this.status === this.enumStatus.FALL) {
            this.maxFrames = this.fallFrames;
        } else if (this.status === this.enumStatus.MAGNET) {
            this.maxFrames = this.magnetFrames;
        } else if (this.status === this.enumStatus.FIXED) {
            this.maxFrames = this.fixedFrames;
        }
    }

    getCollisionRect() {
        return [{
            x1: (this.posX + this.collisionX1[this.currentFrame]),
            x2: ((this.posX + this.width - this.collisionX2[this.currentFrame])),
            y1: (this.posY + this.collisionY1[this.currentFrame]),
            y2: ((this.posY + this.height - this.collisionY2[this.currentFrame]))
        }]
    }

    getMagnetCollisionRect() {
        return [{
            x1: this.posX + 15,
            x2: (this.posX + this.getTrueWidth()),
            y1: this.posY,
            y2: (this.posY + 15)
        }]
    }
}