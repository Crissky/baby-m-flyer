import { BasicAnimated } from "../basic/BasicAnimated.js";

export class Thrower extends BasicAnimated {
    constructor(canvas, projectile, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/thrower.png";
        super(sprites, canvas,
            35, 0,
            35, 28,
            canvas.width, canvas.height,
            0, 0,
            5, 5, 5, 5,
            1.5, 7, 30, debug);
        this.projectile = projectile;
        this.collisionX1 = [8, 12, 8, 8, 11, 13, 15];
        this.collisionX2 = [13, 11, 11, 11, 11, 8, 8];
        this.collisionY1 = [3, 3, 3, 5, 3, 3, 5];
        this.collisionY2 = [5, 5, 5, 5, 5, 5, 5];
        this.currentFrame = 6;
        this.fireUp = false;
    }

    update(speedScreen) {
        if (!this.fireUp || this.currentFrame < 3) {
            this.setProjectilePos();
        }
        super.update(speedScreen);
    }
    updateFrame(speedScreen = 1) {
        if (!this.fireUp || this.currentFrame === 6) {
            return;
        }

        this.currentFrameTime = ++this.currentFrameTime % Math.ceil(this.waitFrameTime);
        if (this.currentFrameTime === 0) {
            this.currentFrame = ++this.currentFrame % this.maxFrame;

            switch (this.currentFrame) {
                case 1:
                    this.waitFrameTime = 10;
                    break;
                case 2:
                    this.waitFrameTime = 5;
                    break;
                case 3:
                    this.waitFrameTime = 100;
                    this.projectile.shootInTargetPlayer(speedScreen);
                    break;
                case 4:
                    this.waitFrameTime = 10;
                    break;
                case 5:
                    this.waitFrameTime = 10;
                    break;
                case 6:
                    this.waitFrameTime = 10;
                    break;
                default:
                    break;
            }
        }
    }

    debugRect() {
        super.debugRect('#ff0000');
    }

    startFire() {
        this.fireUp = true;
        this.currentFrame = 0;
    }

    getCollisionRect() {
        return [{
            x1: (this.posX + (this.sizeMultiplier * this.collisionX1[this.currentFrame])),
            x2: ((this.getEndPosX() - (this.sizeMultiplier * this.collisionX2[this.currentFrame]))),
            y1: (this.posY + (this.sizeMultiplier * this.collisionY1[this.currentFrame])),
            y2: ((this.getEndPosY() - (this.sizeMultiplier * this.collisionY2[this.currentFrame])))
        }]
    }

    setProjectilePos() {
        switch (this.currentFrame) {
            case 0:
                this.projectile.setCenterPosX(this.posX + (this.sizeMultiplier * 16));
                this.projectile.setCenterPosY(this.posY + (this.sizeMultiplier * 10));
                break;
            case 1:
                this.projectile.setCenterPosX(this.posX + (this.sizeMultiplier * 17));
                this.projectile.setCenterPosY(this.posY + (this.sizeMultiplier * 7));
                break;
            case 2:
                this.projectile.setCenterPosX(this.posX + (this.sizeMultiplier * 3));
                this.projectile.setCenterPosY(this.posY + (this.sizeMultiplier * 11));
                break;
            case 6:
                this.projectile.setCenterPosX(this.posX + (this.sizeMultiplier * 23));
                this.projectile.setCenterPosY(this.posY + (this.sizeMultiplier * 15));
                break;
            default:
                break;
        }
    }
}