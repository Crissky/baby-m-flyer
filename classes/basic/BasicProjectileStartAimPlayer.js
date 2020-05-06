import { BasicAnimated } from "./BasicAnimated.js";
import { getProportionalVector } from "../../utils/Angle.js";

export class BasicProjectileStartAimPlayer extends BasicAnimated {
    constructor(sprites, canvas, playerTarget,
        sourceX, sourceY, width, height, posX, posY,
        speedX=0, speedY=0,
        collisionToleranceX1=0, collisionToleranceX2=0, collisionToleranceY1=0, collisionToleranceY2=0,
        sizeMultiplier=1, maxFrame=1, waitFrameTime=10, debug=false) {
        
        super(sprites, canvas,
            sourceX, sourceY, width, height, posX, posY,
            speedX, speedY,
            collisionToleranceX1, collisionToleranceX2, collisionToleranceY1, collisionToleranceY2,
            sizeMultiplier, maxFrame, waitFrameTime, debug);
        
        this.playerTarget = playerTarget;
    }

    update(speedScreen) {
        this.posX -= this.speedX;
        this.posY += this.speedY;
        this.updateFrame();
    }

    debugRect(color='#ff0000') {
        super.debugRect(color);
    }

    shootInTargetPlayer(speed=1) {
        let targetSpeeds = getProportionalVector(this, this.playerTarget, speed);

        this.speedX = targetSpeeds.speedX;
        this.speedY = targetSpeeds.speedY;
    }
}