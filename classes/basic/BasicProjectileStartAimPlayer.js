import { getProportionalVector } from "../../utils/Angle.js";
import { BasicRotatedObject } from "./BasicRotateObject.js";

export class BasicProjectileStartAimPlayer extends BasicRotatedObject {
    constructor(sprites, canvas, playerTarget,
        sourceX, sourceY, width, height, posX, posY,
        speedX = 0, speedY = 0,
        collisionToleranceX1 = 0, collisionToleranceX2 = 0, collisionToleranceY1 = 0, collisionToleranceY2 = 0,
        sizeMultiplier = 1, maxFrame = 1, waitFrameTime = 10, defaultDegreePosition=0, debug = false) {

        super(sprites, canvas,
            sourceX, sourceY, width, height, posX, posY,
            speedX, speedY,
            collisionToleranceX1, collisionToleranceX2, collisionToleranceY1, collisionToleranceY2,
            sizeMultiplier, maxFrame, waitFrameTime, defaultDegreePosition, debug);

        this.playerTarget = playerTarget;
    }

    update(speedScreen = 0) {
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.updateFrame(speedScreen);
        this.updateCurrentDegree(speedScreen);
    }

    debugRect(color = '#ff0000') {
        super.debugRect(color);
    }

    shootInTargetPlayer(speed = 1) {
        let targetSpeeds = getProportionalVector(this, this.playerTarget, speed);

        this.speedX = -targetSpeeds.speedX;
        this.speedY = targetSpeeds.speedY;
    }
}