import { BasicObject } from "./basicObject.js"


export class BasicChar extends BasicObject{
    constructor(sprites, canvas,
        sourceX, sourceY, width, height, posX, posY,
        speedX=0, speedY=0,
        collisionToleranceX1=0, collisionToleranceX2=0, collisionToleranceY1=0, collisionToleranceY2=0,
        sizeMultiplier=1){
        
        super(sprites, canvas,
            sourceX, sourceY, width, height, posX, posY,
            speedX, speedY,
            collisionToleranceX1, collisionToleranceX2, collisionToleranceY1, collisionToleranceY2,
            sizeMultiplier=1);
            
        this.gravity = 0.1;
        this.defaultGravity = 0.1;
    }

    update(speedScreen){
        if (this.posX <= 0 && this.speedX < 0) {
            this.speedX = 0;
            this.posX = 0;
        }
        if ((this.posX + this.getTrueWidth()) >= this.canvas.width && this.speedX > 0) {
            this.speedX = 0;
            this.posX = this.canvas.width - this.getTrueWidth();
        }
        this.posX += this.speedX;
        this.posY += this.speedY;
        super.update(speedScreen);
    }

    reset() {
        super.reset();
        this.gravity = this.defaultGravity;
    }

    click(ScreenSpeed) {}

}