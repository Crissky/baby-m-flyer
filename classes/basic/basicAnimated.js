import { BasicObject } from "./BasicObject.js"


export class BasicAnimated extends BasicObject {
    constructor(sprites, canvas,
        sourceX, sourceY, width, height, posX, posY,
        speedX = 0, speedY = 0,
        collisionToleranceX1 = 0, collisionToleranceX2 = 0, collisionToleranceY1 = 0, collisionToleranceY2 = 0,
        sizeMultiplier = 1, maxFrame = 1, waitFrameTime = 10, debug = false) {

        super(sprites, canvas,
            sourceX, sourceY, width, height, posX, posY,
            speedX, speedY,
            collisionToleranceX1, collisionToleranceX2, collisionToleranceY1, collisionToleranceY2,
            sizeMultiplier, debug);

        this.currentFrame = 0;
        this.maxFrame = maxFrame;
        this.currentFrameTime = 0;
        this.waitFrameTime = waitFrameTime;
    }

    update(speedScreen = 0) {
        this.posX -= speedScreen;
        this.posY += this.speedY;
        this.updateFrame(speedScreen);
    }

    render(facingX = 1, facingY = 1) {
        this.context.save();
        let posX = this.posX;
        let posY = this.posY;
        this.context.scale(facingX, facingY);

        if (facingX === -1) {
            posX = (-this.posX - this.width);
        }

        if (facingY === -1) {
            posY = (-this.posY - this.height);
        }

        this.context.drawImage(this.sprites,
            (this.sourceX * this.currentFrame), this.sourceY,
            this.width, this.height,
            posX, posY,
            this.getTrueWidth(), this.getTrueHeight()
        );

        this.context.restore();

        if (this.debugMode === true) {
            this.debugRect();
        }
    }

    debugRect(color = '#0000ff') {
        super.debugRect(color);
    }

    click(ScreenSpeed) { }

    updateFrame(ScreenSpeed = 1) {
        this.currentFrameTime = ++this.currentFrameTime % Math.ceil(this.waitFrameTime / ScreenSpeed);
        if (this.currentFrameTime === 0) {
            this.currentFrame = ++this.currentFrame % this.maxFrame;
        }
    }
}