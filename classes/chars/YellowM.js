import { BasicChar } from "../basic/BasicChar.js";
import { Sound } from "../../utils/Sound.js";
import { Spark } from "../scenarios/Spark.js";

export class YellowM extends BasicChar {
    constructor(canvas, debug) {
        const sprites = new Image();
        sprites.src = './sprites/baby_W.png';
        super(sprites, canvas,
            35, 0,
            35, 42,
            20, 50,
            0, 0,
            0, 0, 0, 0,
            1, debug);

        this.defaultGravity = 0.1;
        this.gravity = this.defaultGravity;
        this.collisionX1 = [8, 8, 8, 8, 10, 8, 8];
        this.collisionX2 = [14, 14, 14, 14, 14, 14, 14];
        this.collisionY1 = [12, 12, 12, 12, 15, 12, 12];
        this.collisionY2 = [10, 10, 10, 10, 12, 10, 10];
        this.magnetFrames = [5, 6];
        this.fallFrames = [4];
        this.fixedFrames = [0, 1, 2, 3];
        this.maxFrames = this.fallFrames;
        this.currentFrame = 6;
        this.waitFrameTime = 15;
        this.currentFrameTime = 0;
        this.status = this.enumStatus.FALL;
        this.sparkList = [];
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
        if (!this.isFixed()) {
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

    isFixed() {
        return (this.status === this.enumStatus.FIXED);
    }

    isFall() {
        return (this.status === this.enumStatus.FALL);
    }

    isMagnet() {
        return (this.status === this.enumStatus.MAGNET);
    }

    update(speedScreen) {
        if (this.isFall()) {
            this.gravity = this.defaultGravity;
        } else if (this.isMagnet()) {
            this.gravity = -(this.defaultGravity);
        } else if (this.isFixed()) {
            this.gravity = 0;
            this.speedY = 0;
        }
        this.speedY += this.gravity;
        this.posY += this.speedY;

        this.sparkList.forEach(spark => {
            spark.update(speedScreen);
        });

        this.sparkList = this.sparkList.filter(function (spark, index, arr) {
            // return (spark.posY < (spark.player.getEndPosY() + randomIntFromInterval(1, 100) ) );

            return (spark.posY < spark.canvas.height)
        });

        this.updateFrame();
    }

    render() {
        this.context.drawImage(this.sprites,
            (this.sourceX * this.currentFrame), this.sourceY,
            this.width, this.height,
            this.posX, this.posY,
            this.getTrueWidth(), this.getTrueHeight()
        );

        this.sparkList.forEach(spark => {
            spark.render();
        });


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

        if (!this.isFall()) {
            this.context.fillStyle = '#00ff00';
            let magnetCollisionRect = this.getMagnetCollisionRect();
            magnetCollisionRect.forEach(rect => {
                this.context.fillRect(rect.x1, rect.y1, (rect.x2 - rect.x1), (rect.y2 - rect.y1));
            });
        }
        this.context.restore();
    }

    reset() {
        this.status = this.enumStatus.FALL;
        this.sparkList = [];
        super.reset();
    }

    click() {
        if (!this.isFall()) {
            this.setFall();
            this.magnetOnSound.stop();
            this.magnetOffSound.play();
        } else {
            this.status = this.enumStatus.MAGNET;
            this.magnetOffSound.stop();
            this.magnetOnSound.play();
        }
    }

    updateFrame(speedScreen) {
        this.changeFrames();
        this.currentFrameTime = ++this.currentFrameTime % this.waitFrameTime;
        if (this.currentFrameTime === 0) {
            this.currentFrame = this.maxFrames[Math.floor(Math.random() * this.maxFrames.length)];

            if (this.isFixed()) {
                this.appendSpark();
            }
        }
    }

    changeFrames() {
        if (this.isFall()) {
            this.maxFrames = this.fallFrames;
        } else if (this.isMagnet()) {
            this.maxFrames = this.magnetFrames;
        } else if (this.isFixed()) {
            this.maxFrames = this.fixedFrames;
        }
    }

    getCollisionRect() {
        return [{
            x1: (this.posX + (this.collisionX1[this.currentFrame] * this.sizeMultiplier)),
            x2: ((this.getEndPosX() - (this.collisionX2[this.currentFrame] * this.sizeMultiplier))),
            y1: (this.posY + (this.collisionY1[this.currentFrame] * this.sizeMultiplier)),
            y2: ((this.getEndPosY() - (this.collisionY2[this.currentFrame] * this.sizeMultiplier)))
        }]
    }

    getMagnetCollisionRect() {
        return [{
            x1: this.posX + (15 * this.sizeMultiplier),
            x2: (this.getEndPosX() - (2 * this.sizeMultiplier)),
            y1: this.posY,
            y2: (this.posY + (15 * this.sizeMultiplier))
        }]
    }

    appendSpark() {
        let spark = new Spark(this.canvas, this, false);
        spark.posX = this.posX + 23;
        spark.posY = this.posY + 3;
        this.sparkList.push(spark);
    }
}