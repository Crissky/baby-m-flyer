export class BasicElement {
    constructor(sprite, sourceX, sourceY, width, height, posX, posY, canvas, speedMultiplier=0, updateWaitTime=0, debug=false) {
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.maxWidth = ((Math.ceil((canvas.width / width)) + 1) * width);
        this.sprite = sprite;
        this.list = [];
        this.speedMultiplier = speedMultiplier;
        this.updateWaitTime = updateWaitTime;
        this.currentUpdateTime = 0;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }
    
    update(speedScreen) {
        this.currentUpdateTime++;
        if(this.currentUpdateTime >= this.updateWaitTime){
            this.currentUpdateTime = 0;
            this.list.forEach(element => {
               element.posX -= Math.ceil(speedScreen * this.speedMultiplier); 
            });
        }
    }

    debugRect() {
        this.context.save();
        this.context.globalAlpha = 0.5;
        this.context.fillStyle = '#ff0000';
        let collisionRect = this.getCollisionRect();
        this.context.fillRect(collisionRect.x1, collisionRect.y1, (collisionRect.x2 - collisionRect.x1), (collisionRect.y2 - collisionRect.y1));
        this.context.restore();
    }
    
    getCollisionRect() {
        return {
            x1: 0,
            x2: this.maxWidth,
            y1: this.posY,
            y2: (this.posY + this.height)
        }
    }
}