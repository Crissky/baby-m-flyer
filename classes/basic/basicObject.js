export class BasicObject {
    constructor(sprites, canvas,
        sourceX, sourceY, width, height, posX, posY,
        speedX=0, speedY=0,
        collisionToleranceX1=0, collisionToleranceX2=0, collisionToleranceY1=0, collisionToleranceY2=0,
        sizeMultiplier=1, debug=false) {
        this.debugMode = debug;
        this.sprites = sprites;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.collisionToleranceX1 = collisionToleranceX1;
        this.collisionToleranceX2 = collisionToleranceX2;
        this.collisionToleranceY1 = collisionToleranceY1;
        this.collisionToleranceY2 = collisionToleranceY2;
        this.sizeMultiplier = sizeMultiplier;

        //Default
        this.defaultSourceX = sourceX;
        this.defaultSourceY = sourceY;
        this.defaultWidth = width;
        this.defaultHeight = height;
        this.defaultPosX = posX;
        this.defaultPosY = posY;
        this.defaultSpeedX = speedX;
        this.defaultSpeedY = speedY;
    }

    update(speedScreen) { }

    render(facingX=1) {
        this.context.save();
        let posX = this.posX;
        
        if(facingX === -1) {
            this.context.scale(-1,1);
            posX = (-this.posX-this.width);
        }
        
        this.context.drawImage(this.sprites, 
            this.sourceX, this.sourceY, 
            this.width, this.height, 
            posX, this.posY,
            this.getTrueWidth(), this.getTrueHeight()
        );
        
        this.context.restore();
        
        if(this.debugMode === true){
            this.debugRect();
        }
    }

    debugRect(color='#0000ff') {
        this.context.save();
        
        this.context.globalAlpha = 0.5;
        this.context.fillStyle = color;
        let collisionRect = this.getCollisionRect();
        collisionRect.forEach(rect => {
            this.context.fillRect(rect.x1, rect.y1, (rect.x2 - rect.x1), (rect.y2 - rect.y1));
        });
        
        this.context.restore();
    }
    
    reset() {
        this.sourceX = this.defaultSourceX;
        this.sourceY = this.defaultSourceY;
        this.width = this.defaultWidth;
        this.height = this.defaultHeight;
        this.posX =this.defaultPosX;
        this.posY = this.defaultPosY;
        this.speedX = this.defaultSpeedX;
        this.speedY = this.defaultSpeedY;
    }

    getCollisionRect() {
        return [{
            x1: ( this.posX + this.collisionToleranceX1),
            x2: ( this.posX + this.getTrueWidth() - this.collisionToleranceX2 ),
            y1: ( this.posY + this.collisionToleranceY1 ),
            y2: ( this.posY + this.getTrueHeight() - this.collisionToleranceY2 )
        }]
    }

    getTrueWidth() {
        return Math.floor(this.width * this.sizeMultiplier);
    }
    getTrueHeight() {
        return Math.floor(this.height * this.sizeMultiplier);
    }
    getCenterPos() {
        let mPosX = this.posX + (this.getTrueWidth() / 2);
        let mPosY = this.posY + (this.getTrueHeight() / 2);

        return {posX: mPosX, posY: mPosY};
    }
}