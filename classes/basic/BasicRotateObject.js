import { BasicAnimated } from "./BasicAnimated.js";
import { getAngle } from "../../utils/Angle.js";

export class BasicRotatedObject extends BasicAnimated {
    constructor(sprites, canvas,
        sourceX, sourceY, width, height, posX, posY,
        speedX = 0, speedY = 0,
        collisionToleranceX1 = 0, collisionToleranceX2 = 0, collisionToleranceY1 = 0, collisionToleranceY2 = 0,
        sizeMultiplier = 1, maxFrame = 1, waitFrameTime = 10, defaultDegreePosition = 0, debug = false) {

        super(sprites, canvas,
            sourceX, sourceY, width, height, posX, posY,
            speedX, speedY,
            collisionToleranceX1, collisionToleranceX2, collisionToleranceY1, collisionToleranceY2,
            sizeMultiplier, maxFrame, waitFrameTime, debug);

        this.currentDegree = 0;
        this.defaultDegreePosition = defaultDegreePosition;
    }

    update(speedScreen = 0) {
        super.update(speedScreen);
        this.updateFrame(speedScreen);
        this.updateCurrentDegree(speedScreen);
        // console.log("Angle", (this.speedX - speedScreen), this.speedY, this.currentDegree);
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

        this.context.translate((posX + (this.getTrueWidth() / 2)), (posY + (this.getTrueHeight() / 2)));
        this.context.rotate((Math.PI / 180) * (this.currentDegree));

        this.context.drawImage(this.sprites,
            (this.sourceX * this.currentFrame), this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            (this.getTrueWidth() / 2) * (-1), (this.getTrueHeight() / 2) * (-1), // Posição na tela
            this.getTrueWidth(), this.getTrueHeight() // Tamanho da imagem na tela
        );

        this.context.restore();

        if (this.debugMode === true) {
            this.debugRect();
        }
    }

    updateCurrentDegree(speedScreen) {
        this.currentDegree = getAngle((this.speedX - speedScreen), this.speedY, 0, 0);

        this.currentDegree -= this.defaultDegreePosition;
    }
}